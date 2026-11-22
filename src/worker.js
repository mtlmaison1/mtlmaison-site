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

function mailHint(msg) {
  const m = String(msg || '').toLowerCase();
  if (m.includes('mailer') && m.includes('undefined')) return 'The send_email binding (MAILER) is missing. Redeploy the site so wrangler.jsonc is applied.';
  if (m.includes('verified') || m.includes('destination')) return 'Cloudflare does not trust the destination yet. In Cloudflare > mtlmaison.ca > Email > Email Routing > Destination addresses, add ' + TO + ' and click the verification link Cloudflare emails to it.';
  if (m.includes('routing') || m.includes('not enabled') || m.includes('sender') || m.includes('domain')) return 'Email Routing is probably not enabled for mtlmaison.ca. In Cloudflare > mtlmaison.ca > Email > Email Routing, click Enable and accept the DNS records.';
  return 'Open Cloudflare > Workers > mtlmaison-site > Logs to see the full error, then send it to Claude.';
}
async function sendMail(env, { subject, body, replyTo }) {
  if (!env.MAILER || typeof env.MAILER.send !== 'function') throw new Error('MAILER binding is undefined');
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


// ---------- automatic confirmation to the client ----------
const CLIENT_FROM = 'hello@mtlmaison.ca';
const escH = (v) => String(v).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const COPY = {
  en: {
    subject: (ref) => `We got your request · ${ref}`,
    hi: (n) => `Hi ${n},`,
    intro: 'Thank you for choosing MtlMaison. We received your request and we are putting your price together.',
    refL: 'Your reference', pcs: 'Your pieces', special: 'special order', how: 'How you want to receive them',
    pickup: 'Pickup in Montréal. We share the address as soon as we agree on your price.',
    delivery: (p) => `Delivery${p ? ' to ' + p : ''}. We confirm the delivery cost together with your final price.`,
    nextT: 'What happens next',
    next: ['We email you your final price. The more pieces you choose, the better your price.', 'If it works for you, click “I’m in”. We then contact you about pickup or delivery and the next steps.', 'If something does not work, tell us what you would like to change and we will find a solution together.'],
    specialP: 'Some of your pieces are special orders. We order them for you and confirm availability, price and delay in the same email.',
    held: 'Good to know: nothing is paid online, and pieces are not held until you click “I’m in”.',
    cta: 'I’m in / I want changes', ctaNote: 'You can use this link once you have received your price.',
    reply: 'Questions? Just reply to this email.', sign: 'MtlMaison · Montréal', closing: 'Talk soon,',
  },
  fr: {
    subject: (ref) => `Nous avons reçu votre demande · ${ref}`,
    hi: (n) => `Bonjour ${n},`,
    intro: 'Merci d’avoir choisi MtlMaison. Nous avons bien reçu votre demande et nous préparons votre prix.',
    refL: 'Votre référence', pcs: 'Vos pièces', special: 'commande spéciale', how: 'Comment vous souhaitez les recevoir',
    pickup: 'Ramassage à Montréal. Nous partageons l’adresse dès que nous nous entendons sur votre prix.',
    delivery: (p) => `Livraison${p ? ' à ' + p : ''}. Nous confirmons les frais de livraison avec votre prix final.`,
    nextT: 'Et ensuite',
    next: ['Nous vous envoyons votre prix final par courriel. Plus vous choisissez de pièces, meilleur est votre prix.', 'Si cela vous convient, cliquez sur « Je suis partant ». Nous vous écrivons alors au sujet du ramassage ou de la livraison et des prochaines étapes.', 'Si quelque chose ne va pas, dites-nous ce que vous aimeriez modifier et nous trouverons une solution ensemble.'],
    specialP: 'Certaines de vos pièces sont des commandes spéciales. Nous les commandons pour vous et confirmons la disponibilité, le prix et le délai dans le même courriel.',
    held: 'Bon à savoir : rien ne se paie en ligne, et les pièces ne sont pas réservées avant que vous cliquiez sur « Je suis partant ».',
    cta: 'Je suis partant / Je veux des changements', ctaNote: 'Vous pourrez utiliser ce lien une fois votre prix reçu.',
    reply: 'Des questions? Répondez simplement à ce courriel.', sign: 'MtlMaison · Montréal', closing: 'À bientôt,',
  },
};

function clientEmail({ lang, name, ref, method, place, items }) {
  const c = COPY[lang === 'fr' ? 'fr' : 'en'];
  const first = name.split(/\s+/)[0] || name;
  const link = `https://mtlmaison.ca/#/reply/${ref}`;
  const how = method === 'delivery' ? c.delivery(place) : c.pickup;
  const hasSpecial = items.some((i) => i.special);
  const lines = items.map((i) => `- ${i.label || i.id}${i.special ? ` [${c.special}]` : ''}`);
  const text = [c.hi(first), '', c.intro, '', `${c.refL}: ${ref}`, '', `${c.pcs}:`, ...lines, '', `${c.how}:`, how, hasSpecial ? '\n' + c.specialP : null, '', `${c.nextT}:`, ...c.next.map((x, k) => `${k + 1}. ${x}`), '', c.held, '', `${c.cta}: ${link}`, c.ctaNote, '', c.reply, '', c.closing, c.sign].filter((l) => l !== null).join('\n');
  const li = items.map((i) => `<li style="margin:0 0 6px">${escH(i.label || i.id)}${i.special ? ` <span style="background:#EFE6D8;color:#A3643A;font-size:11px;letter-spacing:.08em;text-transform:uppercase;padding:2px 8px">${escH(c.special)}</span>` : ''}</li>`).join('');
  const steps = c.next.map((x, k) => `<tr><td style="vertical-align:top;padding:0 12px 12px 0"><span style="display:inline-block;width:26px;height:26px;line-height:26px;text-align:center;border-radius:50%;background:#2A1E17;color:#EFE6D8;font-size:13px">${k + 1}</span></td><td style="padding:2px 0 12px;font-size:15px;line-height:1.55;color:#2A1E17">${escH(x)}</td></tr>`).join('');
  const html = `<!doctype html><html lang="${lang === 'fr' ? 'fr' : 'en'}"><body style="margin:0;background:#EFE6D8;font-family:Helvetica,Arial,sans-serif;color:#2A1E17">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#EFE6D8"><tr><td align="center" style="padding:28px 12px">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px">
<tr><td style="background:#2A1E17;padding:26px 28px;text-align:center;font-family:Georgia,serif;font-size:28px;letter-spacing:.06em;color:#EFE6D8">MtlMaison</td></tr>
<tr><td style="background:#F6F0E6;padding:28px">
<p style="margin:0 0 14px;font-size:17px">${escH(c.hi(first))}</p>
<p style="margin:0 0 22px;font-size:15px;line-height:1.6">${escH(c.intro)}</p>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 22px"><tr><td style="border:1px dashed #A3643A;padding:14px 18px"><div style="font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:#7a6556">${escH(c.refL)}</div><div style="font-family:Georgia,serif;font-size:28px;letter-spacing:.1em;margin-top:2px">${escH(ref)}</div></td></tr></table>
<h2 style="margin:0 0 8px;font-family:Georgia,serif;font-weight:400;font-size:20px">${escH(c.pcs)}</h2>
<ul style="margin:0 0 ${hasSpecial ? '10' : '22'}px;padding-left:18px;font-size:15px;line-height:1.5">${li}</ul>
${hasSpecial ? `<p style="margin:0 0 22px;font-size:14px;line-height:1.55;color:#5b463a">${escH(c.specialP)}</p>` : ''}
<h2 style="margin:0 0 8px;font-family:Georgia,serif;font-weight:400;font-size:20px">${escH(c.how)}</h2>
<p style="margin:0 0 22px;font-size:15px;line-height:1.55">${escH(how)}</p>
<h2 style="margin:0 0 12px;font-family:Georgia,serif;font-weight:400;font-size:20px">${escH(c.nextT)}</h2>
<table role="presentation" cellpadding="0" cellspacing="0">${steps}</table>
<p style="margin:6px 0 24px;font-size:14px;line-height:1.55;color:#5b463a">${escH(c.held)}</p>
<table role="presentation" cellpadding="0" cellspacing="0"><tr><td style="background:#2A1E17"><a href="${escH(link)}" style="display:inline-block;padding:15px 26px;color:#EFE6D8;text-decoration:none;font-size:13px;letter-spacing:.12em;text-transform:uppercase">${escH(c.cta)}</a></td></tr></table>
<p style="margin:8px 0 24px;font-size:12px;color:#7a6556">${escH(c.ctaNote)}</p>
<p style="margin:0 0 4px;font-size:14px">${escH(c.reply)}</p>
<p style="margin:16px 0 0;font-size:14px">${escH(c.closing)}<br><strong>${escH(c.sign)}</strong></p>
</td></tr></table></td></tr></table></body></html>`;
  return { subject: c.subject(ref), text, html };
}

// Sends the confirmation to the client. Never throws: the request is already safe with the owner.
// Uses the Cloudflare Email Sending binding (EMAIL) or, if a RESEND_API_KEY secret exists, Resend.
async function sendClientMail(env, to, mail) {
  try {
    if (env.EMAIL && typeof env.EMAIL.send === 'function') {
      await env.EMAIL.send({ to, from: { email: CLIENT_FROM, name: 'MtlMaison' }, replyTo: CLIENT_FROM, subject: mail.subject, html: mail.html, text: mail.text });
      return true;
    }
    if (env.RESEND_API_KEY) {
      const r = await fetch('https://api.resend.com/emails', { method: 'POST', headers: { Authorization: 'Bearer ' + env.RESEND_API_KEY, 'Content-Type': 'application/json' }, body: JSON.stringify({ from: 'MtlMaison <' + CLIENT_FROM + '>', to: [to], reply_to: CLIENT_FROM, subject: mail.subject, html: mail.html, text: mail.text }) });
      if (!r.ok) throw new Error('resend ' + r.status + ' ' + (await r.text()).slice(0, 200));
      return true;
    }
  } catch (e) { console.error('CLIENT_MAIL_FAILED', String((e && e.message) || e)); }
  return false;
}

async function handleRequest(env, data) {
  if (data.website) return json({ ok: true, ref: makeRef() }); // honeypot: pretend success
  const name = oneLine(data.name, 100), email = oneLine(data.email, 254), phone = oneLine(data.phone, 40);
  const method = data.method === 'delivery' ? 'delivery' : data.method === 'pickup' ? 'pickup' : '';
  const place = oneLine(data.place, 120), note = clean(data.note, 1000);
  const items = Array.isArray(data.items) ? data.items.slice(0, 40).map((i) => ({ id: oneLine(i && i.id, 20), label: oneLine(i && i.label, 160), special: !!(i && i.special) })).filter((i) => i.id) : [];
  const fields = [];
  if (!items.length) fields.push('cart');
  if (!method) fields.push('method');
  if (method === 'delivery' && !place) fields.push('place');
  if (!name) fields.push('name');
  if (!isEmail(email)) fields.push('email');
  if (fields.length) return json({ ok: false, error: 'invalid', fields }, 400);
  const ref = makeRef();
  const body = [
    `NEW REQUEST ${ref}`, '',
    `Name: ${name}`, `Email: ${email}`, phone ? `Phone: ${phone}` : null,
    `Method: ${method === 'delivery' ? 'DELIVERY' + (place ? ' to ' + place : '') : 'PICKUP in Montréal'}`,
    `Client language: ${data.lang === 'fr' ? 'French' : 'English'}`,
    note ? `\nNote from client:\n${note}` : null,
    `\nPieces (${items.length}):`, ...items.map((i) => `- ${i.label || i.id}${i.special ? '   <<< SPECIAL ORDER: not in stock, we need to order it' : ''}`),
    '', 'To answer: reply to this email (it goes straight to the client) with the final price.',
    `Their "I'm in" / changes link: https://mtlmaison.ca/#/reply/${ref}`,
  ].filter((l) => l !== null).join('\n');
  await sendMail(env, { subject: `New request ${ref} · ${items.length} piece${items.length > 1 ? 's' : ''} · ${method} · ${name}`, body, replyTo: email });
  const mailed = await sendClientMail(env, email, clientEmail({ lang: data.lang, name, ref, method, place, items }));
  return json({ ok: true, ref, mailed });
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
    if (url.pathname === '/api/selftest' && request.method === 'GET') { // temporary: lets the owner check email delivery
      try { await sendMail(env, { subject: 'MtlMaison test email', body: 'If you read this, the website can email you.' }); return json({ ok: true, sent: true, note: 'Sent to ' + TO + '. Check Inbox, Spam and All Mail.' }); }
      catch (e) { const msg = String(e && e.message || e); console.error('selftest failed', msg); return json({ ok: false, error: msg, hint: mailHint(msg) }, 502); }
    }
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
      console.error('send failed', String(e && e.message || e), 'REQUEST_NOT_DELIVERED', JSON.stringify(data).slice(0, 3000));
      return json({ ok: false, error: 'send', detail: String(e && e.message || e).slice(0, 200) }, 502);
    }
  },
};
