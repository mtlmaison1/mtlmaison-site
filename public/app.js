/* MtlMaison website. Plain JavaScript, no build step.
   Pages (hash links): #/  ·  #/c/<category>  ·  #/c/accessories/<type>  ·  #/p/<item id>  ·  #/favourites  ·  #/search  ·  #/book */
(function () {
'use strict';
var CONFIG = window.MM_CONFIG || {};
var ITEMS = window.MM_ITEMS || [];
var ICONS = {"tops": "<path d=\"M8 4 L3.5 6.5 L5 10.5 L7 9.6 V20 H17 V9.6 L19 10.5 L20.5 6.5 L16 4 C15.4 5.7 13.9 6.8 12 6.8 C10.1 6.8 8.6 5.7 8 4 Z\"/>", "bottoms": "<path d=\"M7 3 H17 L18 21 H13.6 L12 10.5 L10.4 21 H6 Z\"/><path d=\"M7.1 6 H16.9\"/>", "jackets": "<path d=\"M8.5 4.5 C8.5 2.4 15.5 2.4 15.5 4.5\"/><path d=\"M8.5 4.5 L4.6 7 L3.4 13.4 L5.6 13.9 L6 21 H18 L18.4 13.9 L20.6 13.4 L19.4 7 L15.5 4.5\"/><path d=\"M8.5 4.5 Q12 7.6 15.5 4.5\"/><path d=\"M12 6.4 V21\"/><path d=\"M5.9 10 H18.1\"/><path d=\"M5.9 14 H18.1\"/><path d=\"M6 17.6 H18\"/>", "purses": "<path d=\"M4 10 H20 L19 20.5 H5 Z\"/><path d=\"M4 10 L6.2 14 H17.8 L20 10\"/><rect x=\"10.8\" y=\"13\" width=\"2.4\" height=\"2.4\" rx=\"0.4\"/><path d=\"M8.5 10 V8.2 C8.5 4.4 15.5 4.4 15.5 8.2 V10\"/><path d=\"M6.5 20.5 V21.5\"/><path d=\"M17.5 20.5 V21.5\"/>", "shoes": "<path d=\"M3.8 7.5 L4.6 12 C7.5 13 9.5 16 12 17.8 C14 19 16 19 21.5 19 C21.5 17.4 20.5 16.6 19 16.3 C15.5 15.6 13 14.8 11 13.4 C8.5 11.6 6 9.5 3.8 7.5 Z\"/><path d=\"M4.6 12 L5.2 20.5\"/><path d=\"M4.4 20.5 H6\"/>", "accessories": "<g transform=\"translate(0.5 0.5) scale(0.46)\" stroke-width=\"__W2__\"><circle cx=\"12\" cy=\"12\" r=\"5\"/><path d=\"M9 7.6 L10 3 H14 L15 7.6\"/><path d=\"M9 16.4 L10 21 H14 L15 16.4\"/><path d=\"M12 10 V12 L13.5 13.2\"/></g><g transform=\"translate(12.5 0.5) scale(0.46)\" stroke-width=\"__W2__\"><rect x=\"2\" y=\"9.5\" width=\"20\" height=\"5\" rx=\"1\"/><rect x=\"8.5\" y=\"8\" width=\"6\" height=\"8\" rx=\"1\"/><path d=\"M11.5 12 H17\"/></g><g transform=\"translate(0.5 12.5) scale(0.46)\" stroke-width=\"__W2__\"><path d=\"M2.5 10 H10 V12.5 A3.5 3.5 0 0 1 6.5 16 H6 A3.5 3.5 0 0 1 2.5 12.5 Z\"/><path d=\"M14 10 H21.5 V12.5 A3.5 3.5 0 0 1 18 16 H17.5 A3.5 3.5 0 0 1 14 12.5 Z\"/><path d=\"M10 11 Q12 9.8 14 11\"/><path d=\"M2.5 10 L1.5 7.5\"/><path d=\"M21.5 10 L22.5 7.5\"/></g><g transform=\"translate(12.5 12.5) scale(0.46)\" stroke-width=\"__W2__\"><path d=\"M6.5 4 H17.5 L21 9 L12 20.5 L3 9 Z\"/><path d=\"M3 9 H21\"/><path d=\"M9.5 4 L12 9 L14.5 4\"/><path d=\"M12 9 V20.5\"/></g>", "watches": "<circle cx=\"12\" cy=\"12\" r=\"5\"/><path d=\"M9 7.6 L10 3 H14 L15 7.6\"/><path d=\"M9 16.4 L10 21 H14 L15 16.4\"/><path d=\"M12 10 V12 L13.5 13.2\"/>", "belts": "<rect x=\"2\" y=\"9.5\" width=\"20\" height=\"5\" rx=\"1\"/><rect x=\"8.5\" y=\"8\" width=\"6\" height=\"8\" rx=\"1\"/><path d=\"M11.5 12 H17\"/>", "jewelry": "<path d=\"M6.5 4 H17.5 L21 9 L12 20.5 L3 9 Z\"/><path d=\"M3 9 H21\"/><path d=\"M9.5 4 L12 9 L14.5 4\"/><path d=\"M12 9 V20.5\"/>", "wallets": "<path d=\"M3.5 7.5 H18.5 A2 2 0 0 1 20.5 9.5 V18 A2 2 0 0 1 18.5 20 H5.5 A2 2 0 0 1 3.5 18 Z\"/><path d=\"M3.5 7.5 L15 4 V7.5\"/><path d=\"M20.5 12 H16.5 A1.75 1.75 0 0 0 16.5 15.5 H20.5\"/>", "sunglasses": "<path d=\"M2.5 10 H10 V12.5 A3.5 3.5 0 0 1 6.5 16 H6 A3.5 3.5 0 0 1 2.5 12.5 Z\"/><path d=\"M14 10 H21.5 V12.5 A3.5 3.5 0 0 1 18 16 H17.5 A3.5 3.5 0 0 1 14 12.5 Z\"/><path d=\"M10 11 Q12 9.8 14 11\"/><path d=\"M2.5 10 L1.5 7.5\"/><path d=\"M21.5 10 L22.5 7.5\"/>", "all": "<rect x=\"4\" y=\"4\" width=\"7\" height=\"7\" rx=\"1\"/><rect x=\"13\" y=\"4\" width=\"7\" height=\"7\" rx=\"1\"/><rect x=\"4\" y=\"13\" width=\"7\" height=\"7\" rx=\"1\"/><rect x=\"13\" y=\"13\" width=\"7\" height=\"7\" rx=\"1\"/>", "new": "<path d=\"M9 3 H15 L19 7 V21 H5 V7 Z\"/><circle cx=\"12\" cy=\"7.5\" r=\"1.3\"/>", "heart": "<path d=\"M12 20 C12 20 4.5 15.4 4.5 9.6 A4 4 0 0 1 12 7.4 A4 4 0 0 1 19.5 9.6 C19.5 15.4 12 20 12 20 Z\"/>", "search": "<circle cx=\"11\" cy=\"11\" r=\"6.5\"/><path d=\"M16 16 L20.5 20.5\"/>", "menu": "<path d=\"M4 7 H20\"/><path d=\"M4 12 H20\"/><path d=\"M4 17 H20\"/>", "close": "<path d=\"M6 6 L18 18\"/><path d=\"M18 6 L6 18\"/>", "back": "<path d=\"M15 5 L8 12 L15 19\"/>", "chevron": "<path d=\"M6 9 L12 15 L18 9\"/>", "message": "<path d=\"M4 5 H20 V16 H9 L5 19.5 V16 H4 Z\"/>", "phone": "<rect x=\"7\" y=\"2.5\" width=\"10\" height=\"19\" rx=\"2\"/><path d=\"M11 18.5 H13\"/>", "mail": "<rect x=\"3\" y=\"5.5\" width=\"18\" height=\"13\" rx=\"1.5\"/><path d=\"M3.5 6.5 L12 13 L20.5 6.5\"/>", "calendar": "<rect x=\"3.5\" y=\"5\" width=\"17\" height=\"15.5\" rx=\"1.5\"/><path d=\"M3.5 10 H20.5\"/><path d=\"M8 3 V7\"/><path d=\"M16 3 V7\"/>", "check": "<path d=\"M5 12.5 L10 17.5 L19 7\"/>", "pin": "<path d=\"M12 21 C12 21 5.5 14.8 5.5 9.8 A6.5 6.5 0 0 1 18.5 9.8 C18.5 14.8 12 21 12 21 Z\"/><circle cx=\"12\" cy=\"9.8\" r=\"2.3\"/>", "clock": "<circle cx=\"12\" cy=\"12\" r=\"8.5\"/><path d=\"M12 7.5 V12 L15 14\"/>"};

var CATS = ['tops', 'bottoms', 'jackets', 'purses', 'shoes', 'accessories'];
var SUBS = ['watches', 'belts', 'jewelry', 'wallets', 'sunglasses'];

var T = {
  en: {
    skip: 'Skip to content', topbar: 'Authentic luxury, for less · Montréal · By appointment',
    shop: 'Shop', all: 'All pieces', 'new': 'New in', favourites: 'Favourites', search: 'Search', menu: 'Menu', close: 'Close', back: 'Back',
    tops: 'Tops', bottoms: 'Bottoms', jackets: 'Jackets', purses: 'Purses', shoes: 'Shoes', accessories: 'Accessories',
    watches: 'Watches', belts: 'Belts', jewelry: 'Jewelry', wallets: 'Wallets', sunglasses: 'Sunglasses',
    tops_d: 'Shirts, knits and tees', bottoms_d: 'Trousers, jeans and skirts', jackets_d: 'Coats, puffers and blazers', purses_d: 'Handbags and crossbody bags', shoes_d: 'Heels, boots and sneakers', accessories_d: 'Watches, belts, jewelry, wallets, sunglasses',
    heroT: 'Authentic luxury, for less.', heroP: 'Designer clothes and accessories at fairer prices. Browse every piece here, then visit the Montréal boutique by appointment.',
    browse: 'Browse the collection', bookVisit: 'Book a visit',
    shopBy: 'Shop by category', newIn: 'New in', seeAll: 'See all pieces',
    howT: 'How it works', h1t: 'Browse', h1p: 'Look through every piece online and save your favourites with the heart.', h2t: 'Ask', h2p: 'Message us about any piece. We reply with the price and whether it is still available.', h3t: 'Visit', h3p: 'Book a private appointment in Montréal to see and try on your pieces.',
    whyT: 'Why MtlMaison', w1t: 'Authentic', w1p: 'Every piece is checked before it is listed.', w2t: 'Fairer prices', w2p: 'Designer quality without the full retail price.', w3t: 'Personal', w3p: 'A private appointment, not a busy shop floor.',
    visitT: 'Visit us in Montréal', visitP: 'By appointment only.', msgUs: 'Message us on Instagram',
    pieces: 'pieces', piece: 'piece', priceReq: 'Price on request', askPiece: 'Ask about this piece', askAllFav: 'Ask about all favourites',
    save: 'Save to favourites', saved: 'Saved to favourites', addFav: 'Add to favourites', removeFav: 'Remove from favourites',
    sort: 'Sort', sortNew: 'Newest', sortAz: 'Name A–Z', size: 'Size', allSizes: 'All sizes',
    brand: 'Brand', condition: 'Condition', ref: 'Reference', category: 'Category', details: 'Details',
    byAppt: 'Viewing is by appointment. Prices are shared when you ask. There is no online checkout.',
    noPieces: 'No pieces here yet.', noPiecesP: 'New pieces arrive often. Tell us what you are looking for.', clear: 'Clear filters',
    lookingT: 'Can’t find what you’re looking for?', lookingP: 'Tell us the piece, size or brand and we will keep an eye out.', tellUs: 'Tell us',
    favEmpty: 'No favourites yet', favEmptyP: 'Tap the heart on any piece to save it here.', favT: 'Your favourites', favNote: 'Saved on this device only.',
    searchT: 'Search', searchPh: 'Brand, piece or reference', searchNone: 'Nothing found. Try another word or ask us directly.', searchHint: 'Try “bag”, “wool” or a brand name.',
    related: 'You may also like', notFound: 'We could not find that page.', backHome: 'Back to home',
    contactT: 'Ask about', contactP: 'Choose how you would like to reach us.', viaIg: 'Instagram message', viaSms: 'Text message', viaMail: 'Email', copyMsg: 'Copy message', copied: 'Message copied', igHelp: 'Paste the message into the chat.',
    msgOne: function (it) { return 'Hello MtlMaison, I would like to ask about ' + it + '. Is it still available, and what is the price? Thank you.'; },
    msgMany: 'Hello MtlMaison, I would like to ask about these pieces. Are they still available, and what are the prices? Thank you.',
    msgGen: 'Hello MtlMaison, I have a question. Thank you.',
    bookT: 'Book a visit', bookP: 'Private appointments in Montréal. Tell us when suits you and we will confirm.',
    fName: 'Your name', fEmail: 'Email', fPhone: 'Phone (optional)', fDate: 'Preferred date', fTime: 'Preferred time', fNote: 'Anything we should know? (optional)',
    send: 'Send request', errName: 'Please enter your name.', errEmail: 'Please enter a valid email.', errDate: 'Please choose a date.', errTime: 'Please choose a time.',
    sentT: 'Almost done', sentP: 'Your email app should open with your request. Send it from there. If nothing opens, copy the request below or message us on Instagram.',
    privNote: 'We only use this to answer your request.', privLink: 'Privacy policy',
    pick: 'Pick a time', calHelp: 'Pick a time that suits you.', openCal: 'Open the calendar in a new tab',
    hoursL: 'Hours', followL: 'Follow', contactL: 'Contact', shopL: 'Shop',
    rights: 'MtlMaison · Montréal', contactUs: 'Contact us', langBtn: 'FR', langLbl: 'Passer au français',
    privT: 'Privacy policy', privUpd: 'Last updated: November 2026',
    privBody: function (c) { return [
      ['Who we are', 'MtlMaison is a Montréal boutique that sells authentic designer clothes and accessories by appointment. The person in charge of personal information is ' + c.name + ', reachable at ' + c.email + '.'],
      ['What we collect', 'Only what you give us when you contact us or request a visit: your name, email address, phone number (optional), preferred date and time, and your message. We do not ask for payment details because nothing is sold on this website.'],
      ['Why we collect it', 'To answer your questions, tell you about a piece and arrange your appointment. We do not use it for anything else, and we do not sell or rent it.'],
      ['Who sees it', 'Only the MtlMaison team. If you message us on Instagram or TikTok, those platforms handle your message under their own policies.'],
      ['Your device', 'This site saves your favourites and your language choice on your own device so they are there next time. This stays on your device, and you can clear it at any time in your browser settings.'],
      ['How long we keep it', 'Only as long as needed to handle your request. Then we delete it.'],
      ['Your rights', 'You can ask to see, correct or delete your information, or withdraw your consent, at any time by writing to ' + c.email + '.']
    ]; }
  },
  fr: {
    skip: 'Aller au contenu', topbar: 'Le luxe authentique, à meilleur prix · Montréal · Sur rendez-vous',
    shop: 'Boutique', all: 'Toutes les pièces', 'new': 'Nouveautés', favourites: 'Favoris', search: 'Recherche', menu: 'Menu', close: 'Fermer', back: 'Retour',
    tops: 'Hauts', bottoms: 'Bas', jackets: 'Manteaux', purses: 'Sacs à main', shoes: 'Chaussures', accessories: 'Accessoires',
    watches: 'Montres', belts: 'Ceintures', jewelry: 'Bijoux', wallets: 'Portefeuilles', sunglasses: 'Lunettes de soleil',
    tops_d: 'Chemises, tricots et t-shirts', bottoms_d: 'Pantalons, jeans et jupes', jackets_d: 'Manteaux, doudounes et blazers', purses_d: 'Sacs à main et sacs bandoulière', shoes_d: 'Talons, bottes et espadrilles', accessories_d: 'Montres, ceintures, bijoux, portefeuilles, lunettes',
    heroT: 'Le luxe authentique, à meilleur prix.', heroP: 'Vêtements et accessoires de designer à des prix plus justes. Parcourez chaque pièce ici, puis venez à la boutique de Montréal sur rendez-vous.',
    browse: 'Parcourir la collection', bookVisit: 'Prendre rendez-vous',
    shopBy: 'Magasiner par catégorie', newIn: 'Nouveautés', seeAll: 'Voir toutes les pièces',
    howT: 'Comment ça marche', h1t: 'Parcourir', h1p: 'Regardez chaque pièce en ligne et gardez vos favoris avec le cœur.', h2t: 'Demander', h2p: 'Écrivez-nous pour toute pièce. Nous répondons avec le prix et la disponibilité.', h3t: 'Visiter', h3p: 'Prenez un rendez-vous privé à Montréal pour voir et essayer vos pièces.',
    whyT: 'Pourquoi MtlMaison', w1t: 'Authentique', w1p: 'Chaque pièce est vérifiée avant d’être affichée.', w2t: 'Prix plus justes', w2p: 'La qualité du designer sans le plein prix.', w3t: 'Personnel', w3p: 'Un rendez-vous privé, pas une boutique achalandée.',
    visitT: 'Venez nous voir à Montréal', visitP: 'Sur rendez-vous seulement.', msgUs: 'Écrivez-nous sur Instagram',
    pieces: 'pièces', piece: 'pièce', priceReq: 'Prix sur demande', askPiece: 'Demander cette pièce', askAllFav: 'Demander tous mes favoris',
    save: 'Ajouter aux favoris', saved: 'Dans vos favoris', addFav: 'Ajouter aux favoris', removeFav: 'Retirer des favoris',
    sort: 'Trier', sortNew: 'Plus récent', sortAz: 'Nom A–Z', size: 'Taille', allSizes: 'Toutes les tailles',
    brand: 'Marque', condition: 'État', ref: 'Référence', category: 'Catégorie', details: 'Détails',
    byAppt: 'Les visites se font sur rendez-vous. Les prix sont donnés sur demande. Il n’y a pas de paiement en ligne.',
    noPieces: 'Aucune pièce pour l’instant.', noPiecesP: 'De nouvelles pièces arrivent souvent. Dites-nous ce que vous cherchez.', clear: 'Effacer les filtres',
    lookingT: 'Vous ne trouvez pas ce que vous cherchez?', lookingP: 'Dites-nous la pièce, la taille ou la marque et nous garderons l’œil ouvert.', tellUs: 'Écrivez-nous',
    favEmpty: 'Aucun favori pour l’instant', favEmptyP: 'Touchez le cœur sur une pièce pour la garder ici.', favT: 'Vos favoris', favNote: 'Gardés sur cet appareil seulement.',
    searchT: 'Recherche', searchPh: 'Marque, pièce ou référence', searchNone: 'Rien trouvé. Essayez un autre mot ou écrivez-nous.', searchHint: 'Essayez « sac », « laine » ou une marque.',
    related: 'Vous aimerez aussi', notFound: 'Cette page est introuvable.', backHome: 'Retour à l’accueil',
    contactT: 'Demander', contactP: 'Choisissez comment nous joindre.', viaIg: 'Message Instagram', viaSms: 'Message texte', viaMail: 'Courriel', copyMsg: 'Copier le message', copied: 'Message copié', igHelp: 'Collez le message dans la conversation.',
    msgOne: function (it) { return 'Bonjour MtlMaison, j’aimerais en savoir plus sur ' + it + '. Est-elle encore disponible, et quel est le prix? Merci.'; },
    msgMany: 'Bonjour MtlMaison, j’aimerais en savoir plus sur ces pièces. Sont-elles encore disponibles, et quels sont les prix? Merci.',
    msgGen: 'Bonjour MtlMaison, j’ai une question. Merci.',
    bookT: 'Prendre rendez-vous', bookP: 'Rendez-vous privés à Montréal. Dites-nous ce qui vous convient et nous confirmerons.',
    fName: 'Votre nom', fEmail: 'Courriel', fPhone: 'Téléphone (facultatif)', fDate: 'Date souhaitée', fTime: 'Heure souhaitée', fNote: 'Quelque chose à nous dire? (facultatif)',
    send: 'Envoyer la demande', errName: 'Veuillez entrer votre nom.', errEmail: 'Veuillez entrer un courriel valide.', errDate: 'Veuillez choisir une date.', errTime: 'Veuillez choisir une heure.',
    sentT: 'Presque terminé', sentP: 'Votre application courriel devrait s’ouvrir avec votre demande. Envoyez-la de là. Si rien ne s’ouvre, copiez la demande ci-dessous ou écrivez-nous sur Instagram.',
    privNote: 'Nous utilisons ceci seulement pour répondre à votre demande.', privLink: 'Politique de confidentialité',
    pick: 'Choisir une heure', calHelp: 'Choisissez l’heure qui vous convient.', openCal: 'Ouvrir le calendrier dans un nouvel onglet',
    hoursL: 'Heures', followL: 'Suivez-nous', contactL: 'Contact', shopL: 'Boutique',
    rights: 'MtlMaison · Montréal', contactUs: 'Nous joindre', langBtn: 'EN', langLbl: 'Switch to English',
    privT: 'Politique de confidentialité', privUpd: 'Dernière mise à jour : novembre 2026',
    privBody: function (c) { return [
      ['Qui nous sommes', 'MtlMaison est une boutique montréalaise qui vend des vêtements et accessoires de designer authentiques, sur rendez-vous. La personne responsable des renseignements personnels est ' + c.name + ', joignable à ' + c.email + '.'],
      ['Ce que nous recueillons', 'Seulement ce que vous nous donnez lorsque vous nous écrivez ou demandez une visite : votre nom, votre courriel, votre téléphone (facultatif), la date et l’heure souhaitées et votre message. Nous ne demandons aucun renseignement de paiement, car rien ne se vend sur ce site.'],
      ['Pourquoi nous le recueillons', 'Pour répondre à vos questions, vous renseigner sur une pièce et fixer votre rendez-vous. Nous ne l’utilisons à aucune autre fin, et nous ne le vendons ni ne le louons.'],
      ['Qui y a accès', 'Seulement l’équipe MtlMaison. Si vous nous écrivez sur Instagram ou TikTok, ces plateformes traitent votre message selon leurs propres politiques.'],
      ['Votre appareil', 'Ce site garde vos favoris et votre choix de langue sur votre propre appareil pour les retrouver la prochaine fois. Cela reste sur votre appareil, et vous pouvez l’effacer en tout temps dans les paramètres de votre navigateur.'],
      ['Durée de conservation', 'Seulement le temps nécessaire pour traiter votre demande. Ensuite, nous la supprimons.'],
      ['Vos droits', 'Vous pouvez demander à voir, corriger ou supprimer vos renseignements, ou retirer votre consentement, en tout temps en écrivant à ' + c.email + '.']
    ]; }
  }
};

/* ---------- state ---------- */
function store(k, v) { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) { return null; } }
var lang = store('mm_lang') || ((navigator.language || '').toLowerCase().indexOf('fr') === 0 ? 'fr' : 'en');
if (lang !== 'fr') lang = 'en';
var favs = [];
try { favs = JSON.parse(store('mm_favs') || '[]'); } catch (e) { favs = []; }
var S = { menuAcc: false, menuAnim: false, sheetAnim: false, popId: null, bump: false, mega: false, menu: false, sheet: null, sort: 'new', size: '', favCat: 'all', booked: null, copied: false, errors: {}, form: { name: '', email: '', phone: '', date: '', time: '', note: '' }, q: '' };

function t(k) { var v = T[lang][k]; return v === undefined ? T.en[k] : v; }
function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
function ico(name, size, sw, fill) {
  var body = (ICONS[name] || '').replace(/__W2__/g, String((sw || 1.5) / 0.46));
  if (name === 'accessories') body = body.replace(/<g transform="([^"]+)" stroke-width="([^"]+)">/g, '<g transform="$1" stroke-width="$2"><g class="mini">').replace(/<\/g>/g, '</g></g>');
  return '<span class="ico" aria-hidden="true"><svg class="ic ic-' + name + '" viewBox="0 0 24 24" width="' + size + '" height="' + size + '" fill="' + (fill || 'none') + '" stroke="currentColor" stroke-width="' + (sw || 1.5) + '" stroke-linecap="round" stroke-linejoin="round">' + body + '</svg></span>';
}
function isFav(id) { return favs.indexOf(id) > -1; }
function toggleFav(id) { var i = favs.indexOf(id); if (i > -1) favs.splice(i, 1); else favs.push(id); store('mm_favs', JSON.stringify(favs)); }
function byId(id) { for (var i = 0; i < ITEMS.length; i++) if (ITEMS[i].id === id) return ITEMS[i]; return null; }
function itemLabel(it) { return it.id + ' ' + [it.brand, it.name].filter(Boolean).join(' ') + (it.size ? ' (' + (lang === 'fr' ? 'taille ' : 'size ') + it.size + ')' : ''); }
function catLabel(it) { return t(it.sub || it.cat); }
function plural(n) { return n + ' ' + (n === 1 ? t('piece') : t('pieces')); }
function igUrl() { return CONFIG.instagram ? 'https://ig.me/m/' + encodeURIComponent(CONFIG.instagram) : ''; }
function route() {
  var h = (location.hash || '').replace(/^#\/?/, '').split('/').map(decodeURIComponent);
  if (!h[0]) return { n: 'home' };
  if (h[0] === 'c') return { n: 'cat', cat: h[1] || 'all', sub: h[2] || '' };
  if (h[0] === 'p') return { n: 'item', id: h[1] };
  if (['favourites', 'search', 'book', 'privacy'].indexOf(h[0]) > -1) return { n: h[0] };
  return { n: '404' };
}

/* ---------- pieces ---------- */
function photoOf(it, big) {
  if (it.photos && it.photos[0]) return '<img src="assets/items/' + esc(it.photos[0]) + '" alt="' + esc(it.brand + ' ' + it.name) + '" loading="lazy">';
  return '<span style="color:var(--caramel)">' + ico(it.sub || it.cat, big ? 120 : 64, 1) + '</span>';
}
function card(it) {
  var on = isFav(it.id);
  return '<article class="card"><a class="open" href="#/p/' + encodeURIComponent(it.id) + '"><span class="ph">' + photoOf(it) + (it.isNew ? '<span class="new">' + t('new') + '</span>' : '') + '</span>' +
    '<span class="brand">' + esc(it.brand) + '</span><span class="pname">' + esc(it.name) + '</span>' +
    '<span class="meta">' + esc(it.size) + (it.condition ? ' · ' + esc(it.condition) : '') + '<br>' + t('priceReq') + '</span></a>' +
    '<button class="heart" data-act="fav" data-id="' + esc(it.id) + '" aria-pressed="' + on + '" aria-label="' + (on ? t('removeFav') : t('addFav')) + ': ' + esc(it.name) + '" style="color:' + (on ? 'var(--caramel)' : 'var(--espresso)') + '">' + ico('heart', 22, 1.6, on ? 'currentColor' : 'none') + '</button>' +
    '<button class="ask" data-act="ask" data-id="' + esc(it.id) + '">' + t('askPiece') + '</button></article>';
}
function sortItems(list) {
  var l = list.slice();
  if (S.sort === 'az') l.sort(function (a, b) { return (a.name + a.brand).localeCompare(b.name + b.brand); });
  return l;
}
function grid(list) { return '<div class="grid">' + list.map(card).join('') + '</div>'; }
function empty(title, body) {
  return '<div class="empty"><span style="color:var(--caramel)">' + ico('all', 40, 1.2) + '</span><h2 class="serif" style="margin:0;font-size:30px">' + title + '</h2><p class="muted">' + body + '</p><button class="btn" data-act="ask-general">' + t('tellUs') + '</button></div>';
}
function looking() {
  return '<div class="looking"><div><h2>' + t('lookingT') + '</h2><p>' + t('lookingP') + '</p></div><button class="btn" data-act="ask-general">' + t('tellUs') + '</button></div>';
}

/* ---------- layout ---------- */
function logo(light) {
  if (!light) return '<a class="logo" href="#/" aria-label="MtlMaison"><img class="logo-img" src="assets/mtlmaison-name.png" alt="MtlMaison" width="132" height="40"></a>';
  return '<a class="logo" href="#/" aria-label="MtlMaison"><span class="mm rev" style="width:44px;height:44px;font-size:26px"><span>M</span><span>M</span></span><span class="serif" style="font-size:26px;color:var(--linen)">MtlMaison</span></a>';
}
function langBtn() { return '<button class="lang" data-act="lang" aria-label="' + t('langLbl') + '">' + t('langBtn') + '</button>'; }
function favBtn() {
  return '<a class="icon-btn" href="#/favourites" aria-label="' + t('favourites') + (favs.length ? ' (' + favs.length + ')' : '') + '">' + ico('heart', 24) + (favs.length ? '<span class="badge">' + favs.length + '</span>' : '') + '</a>';
}
function header(r) {
  var cur = r.n === 'cat' ? r.cat : (r.n === 'item' && byId(r.id) ? byId(r.id).cat : '');
  var nav = '<a href="#/c/new"' + (cur === 'new' ? ' aria-current="page"' : '') + '>' + t('new') + '</a>';
  CATS.forEach(function (c) {
    if (c === 'accessories') nav += '<button data-act="mega" aria-expanded="' + S.mega + '" aria-controls="mega">' + t(c) + ico('chevron', 14, 1.6) + '</button>';
    else nav += '<a href="#/c/' + c + '"' + (cur === c ? ' aria-current="page"' : '') + '>' + t(c) + '</a>';
  });
  nav += '<a href="#/c/all"' + (cur === 'all' ? ' aria-current="page"' : '') + '>' + t('all') + '</a>';
  var mega = '';
  if (S.mega) {
    mega = '<div class="mega" id="mega">' + SUBS.map(function (s, k) { return '<a class="fx" style="--i:' + k + '" href="#/c/accessories/' + s + '"><span style="color:var(--caramel)">' + ico(s, 40, 1.2) + '</span>' + t(s) + '</a>'; }).join('') + '</div>';
  }
  return '<div class="topbar">' + t('topbar') + '</div><header class="site">' +
    '<div class="hdr"><div class="hdr-side">' + langBtn() + '</div>' + logo() + '<div class="hdr-side end"><a class="icon-btn" href="#/search" aria-label="' + t('search') + '">' + ico('search', 24) + '</a>' + favBtn() + '</div></div>' +
    '<div class="hdr-m"><button class="icon-btn burger" data-act="menu" aria-label="' + t('menu') + '"><span class="bl"></span><span class="bl"></span><span class="bl"></span></button>' + logo() + '<span style="display:flex">' + '<a class="icon-btn" href="#/search" aria-label="' + t('search') + '">' + ico('search', 24) + '</a>' + favBtn() + '</span></div>' +
    '<nav class="catnav" aria-label="' + t('shop') + '">' + nav + '</nav>' + mega + '</header>';
}
function mobileMenu(still) {
  if (!S.menu) return '';
  var n = 0;
  function li(href, icon, label) { return '<a href="' + href + '" class="fx" style="--i:' + (n++) + '">' + ico(icon, 26, 1.3) + '<span>' + label + '</span></a>'; }
  var links = li('#/c/new', 'new', t('new'));
  CATS.forEach(function (c) {
    if (c === 'accessories') {
      links += '<div class="menu-acc' + (S.menuAcc ? ' open' : '') + '" style="--i:' + (n++) + '"><button class="fx acc-btn" data-act="menu-acc" aria-expanded="' + !!S.menuAcc + '" aria-controls="acc-sub">' + ico('accessories', 26, 1.3) + '<span>' + t('accessories') + '</span><span class="chev">' + ico('chevron', 20, 1.6) + '</span></button>' +
        '<div class="acc-sub" id="acc-sub"><div class="acc-in"><a href="#/c/accessories" class="fx" style="--j:0">' + ico('accessories', 24, 1.3) + '<span>' + t('all') + '</span></a>' +
        SUBS.map(function (s, k) { return '<a href="#/c/accessories/' + s + '" class="fx" style="--j:' + (k + 1) + '">' + ico(s, 24, 1.3) + '<span>' + t(s) + '</span></a>'; }).join('') + '</div></div></div>';
    } else links += li('#/c/' + c, c, t(c));
  });
  links += li('#/c/all', 'all', t('all')) + li('#/favourites', 'heart', t('favourites')) + li('#/book', 'calendar', t('bookVisit'));
  return '<div class="menu' + (still ? ' still' : '') + '" role="dialog" aria-modal="true" aria-label="' + t('menu') + '"><div class="menu-head"><span class="mm menu-mm" style="width:56px;height:56px;font-size:32px" aria-hidden="true"><span>M</span><span>M</span></span><span style="display:flex">' + langBtn() + '<button class="icon-btn" data-act="menu-close" aria-label="' + t('close') + '">' + ico('close', 26) + '</button></span></div><div class="menu-list">' + links + '</div></div>';
}
function footer() {
  var c = CONFIG, contact = '';
  if (c.instagram) contact += '<a href="https://instagram.com/' + esc(c.instagram) + '" target="_blank" rel="noopener">Instagram</a>';
  if (c.tiktok) contact += '<a href="https://tiktok.com/@' + esc(c.tiktok) + '" target="_blank" rel="noopener">TikTok</a>';
  if (c.email) contact += '<a href="mailto:' + esc(c.email) + '">' + t('contactUs') + '</a>';
  if (c.phone) contact += '<a href="tel:' + esc(c.phone) + '">' + esc(c.phone) + '</a>';
  var hrs = c.hours && c.hours[lang] ? '<div><p class="lbl">' + t('hoursL') + '</p><span>' + esc(c.hours[lang]) + '</span></div>' : '';
  return '<footer class="site"><div class="wrap foot"><div class="foot-top"><div class="foot-brand">' + logo(true) + '</div><div class="foot-cols">' +
    '<div><p class="lbl">' + t('shopL') + '</p><a href="#/c/new">' + t('new') + '</a><a href="#/c/all">' + t('all') + '</a><a href="#/favourites">' + t('favourites') + '</a><a href="#/book">' + t('bookVisit') + '</a></div>' +
    '<div><p class="lbl">' + t('contactL') + '</p>' + contact + '</div>' + hrs + '</div></div>' +
    '<p class="copy"><span>© ' + new Date().getFullYear() + ' ' + t('rights') + '</span><a href="#/privacy">' + t('privLink') + '</a></p></div></footer>';
}
function crumbs(parts) {
  return '<nav class="crumbs" aria-label="Breadcrumb"><a href="#/">' + (lang === 'fr' ? 'Accueil' : 'Home') + '</a>' + parts.map(function (p) { return ' / ' + (p[1] ? '<a href="' + p[1] + '">' + p[0] + '</a>' : '<span aria-current="page">' + p[0] + '</span>'); }).join('') + '</nav>';
}

/* ---------- pages ---------- */
function pageHome() {
  var news = ITEMS.filter(function (i) { return i.isNew; }).slice(0, 8);
  if (!news.length) news = ITEMS.slice(0, 8);
  var tiles = CATS.map(function (c) { return '<a class="tile fx" href="#/c/' + c + '"><span class="sq" style="color:var(--caramel)">' + ico(c, 72, 1) + '</span><span class="nm">' + t(c) + '</span><span class="ds">' + t(c + '_d') + '</span></a>'; }).join('');
  var tag = '<span class="tagmark"><span class="tagsway"><svg viewBox="0 0 300 300" fill="none" stroke="#A3643A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M150 18 C163 18 172 27 172 40 C172 46 169 51 165 54 L262 150 C268 156 268 164 262 170 L170 262 C164 268 156 268 150 262 L38 150 C32 144 32 136 38 130 L135 54 C131 51 128 46 128 40 C128 27 137 18 150 18 Z" transform="rotate(0 150 150)" opacity=".0"/><path d="M96 38 H204 A22 22 0 0 1 226 60 V264 A22 22 0 0 1 204 286 H96 A22 22 0 0 1 74 264 V60 A22 22 0 0 1 96 38 Z"/><circle cx="150" cy="62" r="8"/><path d="M150 54 C150 30 132 14 112 10"/></svg><span class="mono"><span>M</span><span>M</span></span></span></span>';
  var steps = [['h1t', 'h1p'], ['h2t', 'h2p'], ['h3t', 'h3p']].map(function (s, i) { return '<div class="step"><p class="eyebrow">0' + (i + 1) + '</p><h3>' + t(s[0]) + '</h3><p>' + t(s[1]) + '</p></div>'; }).join('');
  var why = [['w1t', 'w1p'], ['w2t', 'w2p'], ['w3t', 'w3p']].map(function (s) { return '<div class="why"><h3>' + t(s[0]) + '</h3><p>' + t(s[1]) + '</p></div>'; }).join('');
  return '<main id="main" tabindex="-1">' +
    '<section class="wrap hero"><div class="hero-text"><p class="eyebrow">Montréal</p><h1>' + t('heroT') + '</h1><p class="lead">' + t('heroP') + '</p><div class="hero-btns"><a class="btn" href="#/c/all">' + t('browse') + '</a><a class="btn-o" href="#/book">' + t('bookVisit') + '</a></div></div><div class="hero-art">' + tag + '</div></section>' +
    '<section class="alt sec"><div class="wrap"><div class="row-head" style="margin-bottom:28px"><h2 class="title">' + t('shopBy') + '</h2></div><div class="tiles">' + tiles + '</div></div></section>' +
    '<section class="sec"><div class="wrap"><div class="row-head" style="margin-bottom:28px"><h2 class="title">' + t('newIn') + '</h2><a class="btn-link" href="#/c/all">' + t('seeAll') + '</a></div>' + (news.length ? grid(news) : empty(t('noPieces'), t('noPiecesP'))) + '</div></section>' +
    '<section class="alt sec"><div class="wrap"><h2 class="title" style="margin-bottom:28px">' + t('howT') + '</h2><div class="steps">' + steps + '</div></div></section>' +
    '<section class="sec"><div class="wrap why-grid"><h2 class="title">' + t('whyT') + '</h2><div class="why-items">' + why + '</div></div></section>' +
    '<section class="visit sec"><div class="wrap visit-in"><div style="display:flex;flex-direction:column;gap:16px"><h2>' + t('visitT') + '</h2><p style="margin:0;font-size:16px">' + t('visitP') + '</p></div><div class="btns"><a class="btn-l" href="#/book">' + t('bookVisit') + '</a>' + (CONFIG.instagram ? '<a class="btn-ol" href="' + igUrl() + '" target="_blank" rel="noopener">' + t('msgUs') + '</a>' : '') + '</div></div></section></main>';
}

function pageCat(r) {
  var cat = r.cat, sub = r.sub, list, title, parts;
  if (cat === 'all') { list = ITEMS; title = t('all'); parts = [[title]]; }
  else if (cat === 'new') { list = ITEMS.filter(function (i) { return i.isNew; }); title = t('new'); parts = [[title]]; }
  else if (CATS.indexOf(cat) > -1) {
    list = ITEMS.filter(function (i) { return i.cat === cat; }); title = t(cat); parts = [[title]];
    if (sub && SUBS.indexOf(sub) > -1) { list = list.filter(function (i) { return i.sub === sub; }); title = t(sub); parts = [[t(cat), '#/c/' + cat], [title]]; }
  } else return page404();
  var sizes = []; list.forEach(function (i) { if (i.size && sizes.indexOf(i.size) < 0) sizes.push(i.size); });
  if (S.size && sizes.indexOf(S.size) < 0) S.size = '';
  var shown = sortItems(S.size ? list.filter(function (i) { return i.size === S.size; }) : list);
  var icoName = sub || (CATS.indexOf(cat) > -1 ? cat : cat === 'new' ? 'new' : 'all');
  var subs = '';
  if (cat === 'accessories') {
    subs = '<div class="chips scroll"><a class="fx subchip' + (!sub ? ' on' : '') + '" href="#/c/accessories"><span style="color:var(--caramel)">' + ico('accessories', 30, 1.3) + '</span>' + t('all') + '</a>' +
      SUBS.map(function (s) { return '<a class="fx subchip' + (sub === s ? ' on' : '') + '" href="#/c/accessories/' + s + '"><span style="color:var(--caramel)">' + ico(s, 30, 1.3) + '</span>' + t(s) + '</a>'; }).join('') + '</div>';
  }
  var sizeBar = sizes.length > 1 ? '<div class="sizes"><span class="lbl">' + t('size') + '</span><div class="chips scroll"><button class="chip' + (!S.size ? ' on' : '') + '" data-act="size" data-size="" aria-pressed="' + !S.size + '">' + t('allSizes') + '</button>' + sizes.map(function (s) { return '<button class="chip' + (S.size === s ? ' on' : '') + '" data-act="size" data-size="' + esc(s) + '" aria-pressed="' + (S.size === s) + '">' + esc(s) + '</button>'; }).join('') + '</div><span class="count">' + plural(shown.length) + '</span></div>' : '';
  return '<main id="main" tabindex="-1" class="wrap page">' + crumbs(parts) +
    '<div class="cat-head"><div class="cat-title"><span class="cat-ico fx" style="color:var(--caramel)">' + ico(icoName, 44, 1.2) + '</span><div><h1>' + title + '</h1>' + (sizes.length > 1 ? '' : '<p class="count">' + plural(shown.length) + '</p>') + '</div></div>' +
    '<label class="sort">' + t('sort') + '<select data-act="sort"><option value="new"' + (S.sort === 'new' ? ' selected' : '') + '>' + t('sortNew') + '</option><option value="az"' + (S.sort === 'az' ? ' selected' : '') + '>' + t('sortAz') + '</option></select></label></div>' +
    subs + sizeBar + '<div class="bar"></div>' +
    (shown.length ? grid(shown) : empty(t('noPieces'), t('noPiecesP'))) + looking() + '</main>';
}

function pageItem(r) {
  var it = byId(r.id); if (!it) return page404();
  var on = isFav(it.id);
  var photos = it.photos || [];
  var thumbs = photos.length > 1 ? '<div class="thumbs">' + photos.slice(0, 4).map(function (p, i) { return '<button data-act="photo" data-i="' + i + '" aria-pressed="' + (i === (S.photo || 0)) + '" aria-label="Photo ' + (i + 1) + '"><img src="assets/items/' + esc(p) + '" alt=""></button>'; }).join('') + '</div>' : '';
  var main = photos.length ? '<img src="assets/items/' + esc(photos[Math.min(S.photo || 0, photos.length - 1)]) + '" alt="' + esc(it.brand + ' ' + it.name) + '">' : '<span style="color:var(--caramel)">' + ico(it.sub || it.cat, 140, 0.9) + '</span>';
  var related = ITEMS.filter(function (i) { return i.cat === it.cat && i.id !== it.id; }).slice(0, 4);
  var parts = [[t(it.cat), '#/c/' + it.cat]]; if (it.sub) parts.push([t(it.sub), '#/c/accessories/' + it.sub]); parts.push([esc(it.name)]);
  return '<main id="main" tabindex="-1" class="wrap page">' + crumbs(parts) +
    '<div class="item-wrap"><div class="gallery"><div class="ph" style="aspect-ratio:4/5">' + main + (it.isNew ? '<span class="new">' + t('new') + '</span>' : '') + '</div>' + thumbs + '</div>' +
    '<div class="info"><p class="brand" style="margin:0">' + esc(it.brand) + '</p><h1>' + esc(it.name) + '</h1><p class="serif" style="margin:0;font-size:28px">' + t('priceReq') + '</p>' +
    '<dl><dt>' + t('size') + '</dt><dd>' + esc(it.size) + '</dd><dt>' + t('condition') + '</dt><dd>' + esc(it.condition) + '</dd><dt>' + t('category') + '</dt><dd>' + esc(catLabel(it)) + '</dd><dt>' + t('ref') + '</dt><dd>' + esc(it.id) + '</dd></dl>' +
    (it.details ? '<p class="muted" style="margin:0">' + esc(it.details) + '</p>' : '') +
    '<div class="actions"><button class="btn" data-act="ask" data-id="' + esc(it.id) + '">' + ico('message', 20, 1.5) + t('askPiece') + '</button>' +
    '<button class="btn-o" data-act="fav" data-id="' + esc(it.id) + '" aria-pressed="' + on + '">' + ico('heart', 20, 1.5, on ? 'currentColor' : 'none') + (on ? t('saved') : t('save')) + '</button>' +
    '<a class="btn-o" href="#/book">' + ico('calendar', 20, 1.5) + t('bookVisit') + '</a></div>' +
    '<p class="note">' + ico('pin', 18, 1.5) + '<span>' + t('byAppt') + '</span></p></div></div>' +
    (related.length ? '<section style="padding-top:32px"><h2 class="title" style="margin-bottom:24px">' + t('related') + '</h2>' + grid(related) + '</section>' : '') + '</main>';
}

function pageFavs() {
  var list = favs.map(byId).filter(Boolean);
  var cats = CATS.filter(function (c) { return list.some(function (i) { return i.cat === c; }); });
  if (S.favCat !== 'all' && cats.indexOf(S.favCat) < 0) S.favCat = 'all';
  var shown = S.favCat === 'all' ? list : list.filter(function (i) { return i.cat === S.favCat; });
  var tabs = list.length ? '<div class="chips scroll" role="tablist"><button class="chip' + (S.favCat === 'all' ? ' on' : '') + '" role="tab" aria-selected="' + (S.favCat === 'all') + '" data-act="favcat" data-c="all">' + t('all') + ' (' + list.length + ')</button>' +
    cats.map(function (c) { return '<button class="chip' + (S.favCat === c ? ' on' : '') + '" role="tab" aria-selected="' + (S.favCat === c) + '" data-act="favcat" data-c="' + c + '">' + t(c) + ' (' + list.filter(function (i) { return i.cat === c; }).length + ')</button>'; }).join('') + '</div>' : '';
  return '<main id="main" tabindex="-1" class="wrap page">' + crumbs([[t('favourites')]]) +
    '<div class="cat-head"><div class="cat-title"><span class="cat-ico fx" style="color:var(--caramel)">' + ico('heart', 44, 1.2) + '</span><div><h1>' + t('favT') + '</h1><p class="count">' + plural(list.length) + ' · ' + t('favNote') + '</p></div></div>' +
    (list.length ? '<button class="btn" data-act="ask-favs">' + ico('message', 20, 1.5) + t('askAllFav') + '</button>' : '') + '</div>' + tabs +
    (shown.length ? grid(shown) : '<div class="empty"><span style="color:var(--caramel)">' + ico('heart', 40, 1.2) + '</span><h2 class="serif" style="margin:0;font-size:30px">' + t('favEmpty') + '</h2><p class="muted">' + t('favEmptyP') + '</p><a class="btn" href="#/c/all">' + t('browse') + '</a></div>') + '</main>';
}

function searchResults() {
  var q = S.q.trim().toLowerCase();
  if (!q) return '<p class="muted">' + t('searchHint') + '</p>';
  var words = q.split(/\s+/);
  var res = ITEMS.filter(function (i) {
    var hay = [i.id, i.brand, i.name, i.size, i.condition, i.details, t(i.cat), i.cat, i.sub ? t(i.sub) : '', i.sub || ''].join(' ').toLowerCase();
    return words.every(function (w) { return hay.indexOf(w) > -1; });
  });
  return '<p class="count">' + plural(res.length) + '</p>' + (res.length ? grid(res) : empty(t('searchNone'), ''));
}
function pageSearch() {
  return '<main id="main" tabindex="-1" class="wrap page">' + crumbs([[t('search')]]) + '<h1>' + t('searchT') + '</h1>' +
    '<div class="search-box">' + ico('search', 24) + '<input type="search" id="q" data-act="q" value="' + esc(S.q) + '" placeholder="' + t('searchPh') + '" aria-label="' + t('searchPh') + '" autocomplete="off"></div>' +
    '<div id="results">' + searchResults() + '</div></main>';
}

function pageBook() {
  var c = CONFIG, f = S.form, er = S.errors;
  var head = crumbs([[t('bookVisit')]]) + '<h1>' + t('bookT') + '</h1><p class="muted" style="margin:0">' + t('bookP') + '</p>';
  if (c.calendly) {
    return '<main id="main" tabindex="-1" class="wrap page book">' + head + '<iframe class="cal" src="' + esc(c.calendly) + '" title="' + t('bookT') + '" loading="lazy"></iframe><a class="btn-link" href="' + esc(c.calendly) + '" target="_blank" rel="noopener">' + t('openCal') + '</a><p class="note">' + t('privNote') + ' <a href="#/privacy">' + t('privLink') + '</a></p></main>';
  }
  if (S.booked) {
    return '<main id="main" tabindex="-1" class="wrap page book">' + head + '<div class="empty" style="align-items:flex-start;text-align:left"><h2 class="serif" style="margin:0;font-size:30px">' + t('sentT') + '</h2><p>' + t('sentP') + '</p><pre style="white-space:pre-wrap;margin:0;font:inherit;background:var(--linen);padding:14px;width:100%">' + esc(S.booked.body) + '</pre>' +
      '<div class="hero-btns" style="width:100%"><button class="btn" data-act="copy-booking">' + (S.copied ? t('copied') : t('copyMsg')) + '</button>' + (c.instagram ? '<a class="btn-o" href="' + igUrl() + '" target="_blank" rel="noopener">' + t('viaIg') + '</a>' : '') + '</div></div></main>';
  }
  var min = new Date(Date.now() + 864e5), minS = min.getFullYear() + '-' + ('0' + (min.getMonth() + 1)).slice(-2) + '-' + ('0' + min.getDate()).slice(-2);
  var times = (c.bookingTimes || []).map(function (tm) { return '<button type="button" class="chip' + (f.time === tm ? ' on' : '') + '" data-act="time" data-t="' + tm + '" aria-pressed="' + (f.time === tm) + '">' + tm + '</button>'; }).join('');
  function fld(id, label, type, extra) { return '<label class="field">' + label + '<input id="f-' + id + '" name="' + id + '" type="' + type + '" value="' + esc(f[id]) + '" ' + (extra || '') + (er[id] ? ' aria-invalid="true" aria-describedby="e-' + id + '"' : '') + '>' + (er[id] ? '<span class="alert" id="e-' + id + '" role="alert" style="text-transform:none;letter-spacing:0">' + er[id] + '</span>' : '') + '</label>'; }
  return '<main id="main" tabindex="-1" class="wrap page book">' + head +
    '<form data-act="book" novalidate style="display:flex;flex-direction:column;gap:20px"><div class="fields">' + fld('name', t('fName'), 'text', 'autocomplete="name"') + fld('email', t('fEmail'), 'email', 'autocomplete="email" inputmode="email"') + '</div>' +
    '<div class="fields">' + fld('phone', t('fPhone'), 'tel', 'autocomplete="tel"') + fld('date', t('fDate'), 'date', 'min="' + minS + '"') + '</div>' +
    '<fieldset><legend>' + t('fTime') + '</legend><div class="chips">' + times + '</div>' + (er.time ? '<p class="alert" role="alert">' + er.time + '</p>' : '') + '</fieldset>' +
    '<label class="field">' + t('fNote') + '<input id="f-note" name="note" type="text" value="' + esc(f.note) + '"></label>' +
    '<button class="btn" type="submit">' + t('send') + '</button><p class="note">' + t('privNote') + ' <a href="#/privacy">' + t('privLink') + '</a></p></form></main>';
}

function pagePrivacy() {
  var secs = T[lang].privBody(CONFIG.privacyContact || { name: '', email: CONFIG.email });
  return '<main id="main" tabindex="-1" class="wrap page">' + crumbs([[t('privT')]]) + '<h1>' + t('privT') + '</h1><p class="muted" style="margin:0">' + t('privUpd') + '</p><div class="prose">' +
    secs.map(function (s) { return '<h2>' + s[0] + '</h2><p>' + esc(s[1]) + '</p>'; }).join('') + '</div></main>';
}
function page404() { return '<main id="main" tabindex="-1" class="wrap page"><h1>404</h1><p>' + t('notFound') + '</p><a class="btn" href="#/" style="align-self:flex-start">' + t('backHome') + '</a></main>'; }

/* ---------- contact sheet ---------- */
function sheetMessage() {
  var sh = S.sheet; if (!sh) return '';
  if (sh.ids.length === 0) return t('msgGen');
  if (sh.ids.length === 1) return T[lang].msgOne(itemLabel(byId(sh.ids[0])));
  return t('msgMany') + '\n\n' + sh.ids.map(function (id) { return '- ' + itemLabel(byId(id)); }).join('\n');
}
function sheetHtml(still) {
  if (!S.sheet) return '';
  var m = sheetMessage(), c = CONFIG, opts = '';
  if (c.instagram) opts += '<a class="opt dark" href="' + igUrl() + '" target="_blank" rel="noopener" data-act="copy-keep">' + ico('message', 22, 1.4) + t('viaIg') + '</a>';
  if (c.phone) opts += '<a class="opt" href="sms:' + esc(c.phone) + '?&body=' + encodeURIComponent(m) + '">' + ico('phone', 22, 1.4) + t('viaSms') + '</a>';
  if (c.email) opts += '<a class="opt" href="mailto:' + esc(c.email) + '?subject=' + encodeURIComponent('MtlMaison') + '&body=' + encodeURIComponent(m) + '">' + ico('mail', 22, 1.4) + t('viaMail') + '</a>';
  opts += '<button class="opt" data-act="copy-msg" style="background:transparent;text-align:left">' + ico(S.copied ? 'check' : 'message', 22, 1.4) + (S.copied ? t('copied') : t('copyMsg')) + '</button>';
  var title = S.sheet.ids.length === 1 ? t('contactT') + ' ' + esc(byId(S.sheet.ids[0]).name) : S.sheet.ids.length ? t('askAllFav') : t('tellUs');
  return '<div class="overlay' + (still ? ' still' : '') + '" data-act="sheet-bg"><div class="sheet" role="dialog" aria-modal="true" aria-labelledby="sheet-t"><div class="sheet-head"><h2 id="sheet-t">' + title + '</h2><button class="icon-btn" data-act="sheet-close" aria-label="' + t('close') + '" id="sheet-x">' + ico('close', 24) + '</button></div>' +
    '<p class="muted" style="margin:0">' + t('contactP') + '</p><p class="msg" style="white-space:pre-wrap">' + esc(m) + '</p>' + opts + (c.instagram ? '<p class="note" style="font-size:13px">' + t('igHelp') + '</p>' : '') + '</div></div>';
}
function copyText(txt, done) {
  function fallback() { var ta = document.createElement('textarea'); ta.value = txt; ta.style.position = 'fixed'; ta.style.opacity = '0'; document.body.appendChild(ta); ta.select(); try { document.execCommand('copy'); } catch (e) {} document.body.removeChild(ta); done(); }
  if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(txt).then(done, fallback); else fallback();
}

/* ---------- render ---------- */
var appEl = document.getElementById('app');
var IO = null;
var REVEAL = '.card,.tile,.step,.why,.looking,.empty,.visit-in>*,h2.title,.cat-head,.hero-text>*,.hero-art,.crumbs,.gallery,.info>*,.prose>*,.row-head,.book form,.sizes,.related';
function titleFor(r) {
  var base = 'MtlMaison';
  if (r.n === 'item' && byId(r.id)) return byId(r.id).brand + ' ' + byId(r.id).name + ' · ' + base;
  if (r.n === 'cat') return (r.cat === 'all' ? t('all') : r.cat === 'new' ? t('new') : t(r.sub || r.cat)) + ' · ' + base;
  if (r.n === 'favourites') return t('favourites') + ' · ' + base;
  if (r.n === 'search') return t('search') + ' · ' + base;
  if (r.n === 'book') return t('bookVisit') + ' · ' + base;
  if (r.n === 'privacy') return t('privT') + ' · ' + base;
  return base + ' · ' + t('heroT').replace(/\.$/, '') + ' · Montréal';
}
function decorate(keep) {
  if (IO) { IO.disconnect(); IO = null; }
  var els = appEl.querySelectorAll(REVEAL);
  if (!keep && 'IntersectionObserver' in window) {
    IO = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); IO.unobserve(e.target); } }); }, { threshold: 0.1, rootMargin: '0px 0px -5% 0px' });
  }
  for (var i = 0; i < els.length; i++) {
    var el = els[i], idx = Array.prototype.indexOf.call(el.parentNode.children, el);
    el.style.setProperty('--d', Math.min(idx, 7) * 70 + 'ms');
    el.classList.add('rv');
    if (IO) IO.observe(el); else el.classList.add('in');
  }
}
function onScroll() {
  var h = document.querySelector('header.site'); if (h) h.classList.toggle('scrolled', window.scrollY > 10);
  var f = document.querySelector('.fab'); if (f) f.classList.toggle('show', window.scrollY > 500);
}
function render(keepScroll) {
  var r = route(), y = window.scrollY;
  var animMenu = S.menuAnim, animSheet = S.sheetAnim; S.menuAnim = false; S.sheetAnim = false;
  var body = { home: pageHome, cat: pageCat, item: pageItem, favourites: pageFavs, search: pageSearch, book: pageBook, privacy: pagePrivacy }[r.n];
  appEl.innerHTML = header(r) + (body ? body(r) : page404()) + footer() + mobileMenu(!animMenu) + sheetHtml(!animSheet) +
    ((S.menu || S.sheet) ? '' : '<button class="fab" data-act="ask-general" aria-label="' + t('contactUs') + '">' + ico('message', 26, 1.5) + '</button>');
  document.documentElement.lang = lang;
  document.title = titleFor(r);
  document.body.style.overflow = (S.menu || S.sheet) ? 'hidden' : '';
  var main = document.getElementById('main'); if (main && !keepScroll) main.classList.add('enter');
  decorate(keepScroll);
  if (S.popId) { var hs = appEl.querySelectorAll('[data-act="fav"][data-id="' + S.popId + '"]'); for (var i = 0; i < hs.length; i++) hs[i].classList.add('beat'); S.popId = null; }
  if (S.bump) { var bs = appEl.querySelectorAll('.badge'); for (var k = 0; k < bs.length; k++) bs[k].classList.add('bump'); S.bump = false; }
  if (keepScroll) window.scrollTo(0, y);
  if (animSheet) { var x = document.getElementById('sheet-x'); if (x) x.focus(); }
  onScroll();
}
function go() { S.mega = false; S.menu = false; S.photo = 0; S.size = ''; if (route().n !== 'book') S.booked = null; render(false); window.scrollTo(0, 0); }
function closeMenu() {
  var m = document.querySelector('.menu');
  if (!m) { S.menu = false; render(true); return; }
  m.classList.remove('still'); m.classList.add('closing');
  setTimeout(function () { S.menu = false; render(true); }, 300);
}
function openSheet(ids) { S.sheet = { ids: ids }; S.copied = false; S.sheetAnim = true; render(true); }

/* ---------- events ---------- */
function validate() {
  var f = S.form, e = {};
  if (!f.name.trim()) e.name = t('errName');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim())) e.email = t('errEmail');
  if (!f.date) e.date = t('errDate');
  if (!f.time) e.time = t('errTime');
  return e;
}
function bookingText() {
  var f = S.form, fr = lang === 'fr';
  return (fr ? 'Demande de visite · MtlMaison' : 'Visit request · MtlMaison') + '\n\n' +
    (fr ? 'Nom : ' : 'Name: ') + f.name.trim() + '\n' + (fr ? 'Courriel : ' : 'Email: ') + f.email.trim() + '\n' + (f.phone.trim() ? (fr ? 'Téléphone : ' : 'Phone: ') + f.phone.trim() + '\n' : '') +
    (fr ? 'Date souhaitée : ' : 'Preferred date: ') + f.date + '\n' + (fr ? 'Heure souhaitée : ' : 'Preferred time: ') + f.time + '\n' + (f.note.trim() ? '\n' + f.note.trim() + '\n' : '') +
    (favs.length ? '\n' + (fr ? 'Pièces qui m’intéressent :' : 'Pieces I am interested in:') + '\n' + favs.map(byId).filter(Boolean).map(function (i) { return '- ' + itemLabel(i); }).join('\n') + '\n' : '');
}
function ripple(ev) {
  var rp = ev.target.closest && ev.target.closest('.btn,.btn-o,.btn-l,.btn-ol,.opt,.chip,.ask,.subchip');
  if (!rp) return;
  var b = rp.getBoundingClientRect(), s = document.createElement('span'), d = Math.max(b.width, b.height) * 2;
  s.className = 'rip';
  s.style.cssText = 'width:' + d + 'px;height:' + d + 'px;left:' + (ev.clientX - b.left - d / 2) + 'px;top:' + (ev.clientY - b.top - d / 2) + 'px';
  rp.appendChild(s);
  setTimeout(function () { if (s.parentNode) s.parentNode.removeChild(s); }, 650);
}
function playFx(ev) {
  var fx = ev.target.closest && ev.target.closest('.fx,.catnav a');
  if (!fx) return;
  fx.classList.remove('pop'); void fx.offsetWidth; fx.classList.add('pop');
  setTimeout(function () { fx.classList.remove('pop'); }, 900);
}
document.addEventListener('click', function (ev) {
  var sk = ev.target.closest && ev.target.closest('a.skip');
  if (sk) { ev.preventDefault(); var m = document.getElementById('main'); if (m) m.focus(); return; }
  ripple(ev); playFx(ev);
  var el = ev.target.closest && ev.target.closest('[data-act]');
  if (!el || el.tagName === 'SELECT' || el.tagName === 'INPUT' || el.tagName === 'FORM') return;
  var a = el.getAttribute('data-act'), id = el.getAttribute('data-id');
  if (a === 'sheet-bg') { if (ev.target !== el) return; S.sheet = null; S.copied = false; render(true); return; }
  if (a === 'copy-keep') return;
  if (el.tagName !== 'A') ev.preventDefault();
  if (a === 'fav') { toggleFav(id); S.popId = id; S.bump = true; render(true); }
  else if (a === 'ask') openSheet([id]);
  else if (a === 'ask-favs') openSheet(favs.filter(byId));
  else if (a === 'ask-general') openSheet([]);
  else if (a === 'sheet-close') { S.sheet = null; S.copied = false; render(true); }
  else if (a === 'copy-msg') { copyText(sheetMessage(), function () { S.copied = true; render(true); }); }
  else if (a === 'copy-booking') { copyText(S.booked.body, function () { S.copied = true; render(true); }); }
  else if (a === 'lang') { lang = lang === 'fr' ? 'en' : 'fr'; store('mm_lang', lang); render(true); }
  else if (a === 'menu') { el.classList.add('x'); setTimeout(function () { S.menu = true; S.menuAnim = true; render(true); }, 230); }
  else if (a === 'menu-close') closeMenu();
  else if (a === 'menu-acc') { var w = el.closest('.menu-acc'); S.menuAcc = !w.classList.contains('open'); w.classList.toggle('open', S.menuAcc); el.setAttribute('aria-expanded', S.menuAcc); }
  else if (a === 'mega') { S.mega = !S.mega; render(true); }
  else if (a === 'size') { S.size = el.getAttribute('data-size'); render(true); }
  else if (a === 'favcat') { S.favCat = el.getAttribute('data-c'); render(true); }
  else if (a === 'photo') { S.photo = +el.getAttribute('data-i'); render(true); }
  else if (a === 'time') { S.form.time = el.getAttribute('data-t'); render(true); }
});
document.addEventListener('change', function (ev) { if (ev.target.getAttribute && ev.target.getAttribute('data-act') === 'sort') { S.sort = ev.target.value; render(true); } });
document.addEventListener('input', function (ev) {
  var tg = ev.target;
  if (tg.id === 'q') { S.q = tg.value; var r = document.getElementById('results'); if (r) r.innerHTML = searchResults(); }
  else if (tg.id && tg.id.indexOf('f-') === 0) S.form[tg.id.slice(2)] = tg.value;
});
document.addEventListener('submit', function (ev) {
  var f = ev.target; if (f.getAttribute('data-act') !== 'book') return;
  ev.preventDefault();
  S.errors = validate();
  var keys = Object.keys(S.errors);
  if (keys.length) { render(true); var first = document.getElementById('f-' + keys[0]) || document.querySelector('.alert'); if (first) first.focus(); return; }
  var body = bookingText();
  S.booked = { body: body }; S.copied = false; render(false); window.scrollTo(0, 0);
  if (CONFIG.email) location.href = 'mailto:' + CONFIG.email + '?subject=' + encodeURIComponent(lang === 'fr' ? 'Demande de visite · MtlMaison' : 'Visit request · MtlMaison') + '&body=' + encodeURIComponent(body);
});
document.addEventListener('keydown', function (ev) {
  if (ev.key === 'Escape') { if (S.sheet) { S.sheet = null; S.copied = false; render(true); } else if (S.menu) closeMenu(); else if (S.mega) { S.mega = false; render(true); } }
});
document.addEventListener('mousemove', function (ev) {
  var tm = document.querySelector('.tagmark'); if (!tm) return;
  var a = ev.target.closest && ev.target.closest('.hero-art');
  if (a) { var b = a.getBoundingClientRect(), x = (ev.clientX - b.left) / b.width - 0.5, yy = (ev.clientY - b.top) / b.height - 0.5; tm.style.transform = 'perspective(700px) rotateY(' + (x * 20) + 'deg) rotateX(' + (-yy * 20) + 'deg)'; }
  else tm.style.transform = '';
});
window.addEventListener('scroll', onScroll, { passive: true });
window.addEventListener('hashchange', go);
window.addEventListener('storage', function () { try { favs = JSON.parse(store('mm_favs') || '[]'); } catch (e) {} render(true); });
render(false);
})();
