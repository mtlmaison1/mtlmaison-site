// MtlMaison: receives cart requests and "I'm in" / change replies and emails them to the owner.
// Everything else is served as static files from ./public.
import { EmailMessage } from 'cloudflare:email';

const FROM = 'requests@mtlmaison.ca';
const TO = 'mtlmaison1@gmail.com'; // must be a verified destination in Cloudflare Email Routing
const ALLOWED = /(^|\.)mtlmaison\.ca$|\.workers\.dev$|^localhost$|^127\.0\.0\.1$/;

const json = (obj, status = 200) =>
  new Response(JSON.stringify(obj), { status, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' } });

const clean = (v, max) => String(v == null ? '' : v).replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '').trim().slice(0, max);
const oneLine = (v, max) => clean(v, max).replace(/[\r\n]+/g, ' ');
const isEmail = (v) => /^[^\s@]{1,64}@[^\s@]{1,190}\.[^\s@]{2,}$/.test(v);

function b64(str) {
  const bytes = new TextEncoder().encode(str);
  let bin = '';
  for (let i = 0; i < bytes.length; i += 0x8000) bin += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  return btoa(bin);
}
const wrap76 = (s) => s.replace(/(.{76})/g, '$1\r\n');

function makeRef() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const bytes = crypto.getRandomValues(new Uint8Array(5));
  return 'MM-' + Array.from(bytes, (b) => chars[b % chars.length]).join('');
}

async function sendMail(env, { subject, body, replyTo }) {
  const headers = [
    `From: MtlMaison Website <${FROM}>`,
    `To: ${TO}`,
    replyTo ? `Reply-To: ${replyTo}` : null,
    `Subject: =?UTF-8?B?${b64(subject)}?=`,
    `Message-ID: <${crypto.randomUUID()}@mtlmaison.ca>`,
    `Date: ${new Date().toUTCString()}`,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: base64',
  ].filter(Boolean);
  const raw = headers.join('\r\n') + '\r\n\r\n' + wrap76(b64(body)) + '\r\n';
  await env.MAILER.send(new EmailMessage(FROM, TO, raw));
}

async function handleRequest(env, data) {
  if (data.website) return json({ ok: true, ref: makeRef() }); // honeypot: pretend success
  const name = oneLine(data.name, 100), email = oneLine(data.email, 254), phone = oneLine(data.phone, 40);
  const method = data.method === 'delivery' ? 'delivery' : data.method === 'pickup' ? 'pickup' : '';
  const place = oneLine(data.place, 120), note = clean(data.note, 1000);
  const items = Array.isArray(data.items) ? data.items.slice(0, 40).map((i) => ({ id: oneLine(i && i.id, 20), label: oneLine(i && i.label, 160) })).filter((i) => i.id) : [];
  if (!name || !isEmail(email) || !method || !items.length || (method === 'delivery' && !place)) return json({ ok: false, error: 'invalid' }, 400);
  const ref = makeRef();
  const body = [
    `NEW REQUEST ${ref}`, '',
    `Name: ${name}`, `Email: ${email}`, phone ? `Phone: ${phone}` : null,
    `Method: ${method === 'delivery' ? 'DELIVERY' + (place ? ' to ' + place : '') : 'PICKUP in Montréal'}`,
    `Client language: ${data.lang === 'fr' ? 'French' : 'English'}`,
    note ? `\nNote from client:\n${note}` : null,
    `\nPieces (${items.length}):`, ...items.map((i) => `- ${i.label || i.id}`),
    '', 'To answer: reply to this email (it goes straight to the client) with the final price.',
    `Their "I'm in" / changes link: https://mtlmaison.ca/#/reply/${ref}`,
  ].filter((l) => l !== null).join('\n');
  await sendMail(env, { subject: `New request ${ref} · ${items.length} piece${items.length > 1 ? 's' : ''} · ${method} · ${name}`, body, replyTo: email });
  return json({ ok: true, ref });
}

async function handleReply(env, data) {
  if (data.website) return json({ ok: true });
  const ref = oneLine(data.ref, 20).toUpperCase();
  const type = data.type === 'in' ? 'in' : data.type === 'change' ? 'change' : '';
  const message = clean(data.message, 2000), email = oneLine(data.email, 254);
  if (!/^MM-[A-Z0-9]{3,8}$/.test(ref) || !type || (type === 'change' && !message) || (email && !isEmail(email))) return json({ ok: false, error: 'invalid' }, 400);
  const body = [
    type === 'in' ? `"I'M IN" for request ${ref}` : `CHANGES requested for request ${ref}`, '',
    email ? `Email given: ${email}` : 'No email given: find the client in the original request email.',
    `Client language: ${data.lang === 'fr' ? 'French' : 'English'}`,
    message ? `\nMessage:\n${message}` : null,
    '', type === 'in' ? 'Next: contact them about pickup/delivery and the next steps.' : 'Next: reply to find a solution together.',
  ].filter((l) => l !== null).join('\n');
  await sendMail(env, { subject: type === 'in' ? `I'M IN · ${ref}` : `Changes requested · ${ref}`, body, replyTo: email || undefined });
  return json({ ok: true });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (!url.pathname.startsWith('/api/')) return env.ASSETS.fetch(request);
    if (request.method !== 'POST') return json({ ok: false, error: 'method' }, 405);
    const origin = request.headers.get('Origin');
    if (origin) { try { if (!ALLOWED.test(new URL(origin).hostname)) return json({ ok: false, error: 'origin' }, 403); } catch (e) { return json({ ok: false, error: 'origin' }, 403); } }
    let data;
    try { data = await request.json(); } catch (e) { return json({ ok: false, error: 'json' }, 400); }
    if (!data || typeof data !== 'object') return json({ ok: false, error: 'json' }, 400);
    try {
      if (url.pathname === '/api/request') return await handleRequest(env, data);
      if (url.pathname === '/api/reply') return await handleReply(env, data);
      return json({ ok: false, error: 'notfound' }, 404);
    } catch (e) {
      return json({ ok: false, error: 'send' }, 502);
    }
  },
};
