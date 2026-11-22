/* MtlMaison website. Plain JavaScript, no build step.
   Pages (hash links): #/  ·  #/c/<category>  ·  #/c/accessories/<type>  ·  #/p/<item id>  ·  #/favourites  ·  #/search  ·  #/book */
(function () {
'use strict';
var CONFIG = window.MM_CONFIG || {};
var ITEMS = window.MM_ITEMS || [];
var ICONS = {"tops": "<path d=\"M8 4 L3.5 6.5 L5 10.5 L7 9.6 V20 H17 V9.6 L19 10.5 L20.5 6.5 L16 4 C15.4 5.7 13.9 6.8 12 6.8 C10.1 6.8 8.6 5.7 8 4 Z\"/>", "bottoms": "<path d=\"M7 3 H17 L18 21 H13.6 L12 10.5 L10.4 21 H6 Z\"/><path d=\"M7.1 6 H16.9\"/>", "jackets": "<path d=\"M8.5 4.5 C8.5 2.4 15.5 2.4 15.5 4.5\"/><path d=\"M8.5 4.5 L4.6 7 L3.4 13.4 L5.6 13.9 L6 21 H18 L18.4 13.9 L20.6 13.4 L19.4 7 L15.5 4.5\"/><path d=\"M8.5 4.5 Q12 7.6 15.5 4.5\"/><path d=\"M12 6.4 V21\"/><path d=\"M5.9 10 H18.1\"/><path d=\"M5.9 14 H18.1\"/><path d=\"M6 17.6 H18\"/>", "purses": "<path d=\"M4 10 H20 L19 20.5 H5 Z\"/><path d=\"M4 10 L6.2 14 H17.8 L20 10\"/><rect x=\"10.8\" y=\"13\" width=\"2.4\" height=\"2.4\" rx=\"0.4\"/><path d=\"M8.5 10 V8.2 C8.5 4.4 15.5 4.4 15.5 8.2 V10\"/><path d=\"M6.5 20.5 V21.5\"/><path d=\"M17.5 20.5 V21.5\"/>", "shoes": "<path d=\"M3.8 7.5 L4.6 12 C7.5 13 9.5 16 12 17.8 C14 19 16 19 21.5 19 C21.5 17.4 20.5 16.6 19 16.3 C15.5 15.6 13 14.8 11 13.4 C8.5 11.6 6 9.5 3.8 7.5 Z\"/><path d=\"M4.6 12 L5.2 20.5\"/><path d=\"M4.4 20.5 H6\"/>", "accessories": "<g transform=\"translate(0.5 0.5) scale(0.46)\" stroke-width=\"__W2__\"><circle cx=\"12\" cy=\"12\" r=\"5\"/><path d=\"M9 7.6 L10 3 H14 L15 7.6\"/><path d=\"M9 16.4 L10 21 H14 L15 16.4\"/><path d=\"M12 10 V12 L13.5 13.2\"/></g><g transform=\"translate(12.5 0.5) scale(0.46)\" stroke-width=\"__W2__\"><rect x=\"2\" y=\"9.5\" width=\"20\" height=\"5\" rx=\"1\"/><rect x=\"8.5\" y=\"8\" width=\"6\" height=\"8\" rx=\"1\"/><path d=\"M11.5 12 H17\"/></g><g transform=\"translate(0.5 12.5) scale(0.46)\" stroke-width=\"__W2__\"><path d=\"M2.5 10 H10 V12.5 A3.5 3.5 0 0 1 6.5 16 H6 A3.5 3.5 0 0 1 2.5 12.5 Z\"/><path d=\"M14 10 H21.5 V12.5 A3.5 3.5 0 0 1 18 16 H17.5 A3.5 3.5 0 0 1 14 12.5 Z\"/><path d=\"M10 11 Q12 9.8 14 11\"/><path d=\"M2.5 10 L1.5 7.5\"/><path d=\"M21.5 10 L22.5 7.5\"/></g><g transform=\"translate(12.5 12.5) scale(0.46)\" stroke-width=\"__W2__\"><path d=\"M6.5 4 H17.5 L21 9 L12 20.5 L3 9 Z\"/><path d=\"M3 9 H21\"/><path d=\"M9.5 4 L12 9 L14.5 4\"/><path d=\"M12 9 V20.5\"/></g>", "watches": "<circle cx=\"12\" cy=\"12\" r=\"5\"/><path d=\"M9 7.6 L10 3 H14 L15 7.6\"/><path d=\"M9 16.4 L10 21 H14 L15 16.4\"/><path d=\"M12 10 V12 L13.5 13.2\"/>", "belts": "<rect x=\"2\" y=\"9.5\" width=\"20\" height=\"5\" rx=\"1\"/><rect x=\"8.5\" y=\"8\" width=\"6\" height=\"8\" rx=\"1\"/><path d=\"M11.5 12 H17\"/>", "jewelry": "<path d=\"M6.5 4 H17.5 L21 9 L12 20.5 L3 9 Z\"/><path d=\"M3 9 H21\"/><path d=\"M9.5 4 L12 9 L14.5 4\"/><path d=\"M12 9 V20.5\"/>", "wallets": "<path d=\"M3.5 7.5 H18.5 A2 2 0 0 1 20.5 9.5 V18 A2 2 0 0 1 18.5 20 H5.5 A2 2 0 0 1 3.5 18 Z\"/><path d=\"M3.5 7.5 L15 4 V7.5\"/><path d=\"M20.5 12 H16.5 A1.75 1.75 0 0 0 16.5 15.5 H20.5\"/>", "sunglasses": "<path d=\"M2.5 10 H10 V12.5 A3.5 3.5 0 0 1 6.5 16 H6 A3.5 3.5 0 0 1 2.5 12.5 Z\"/><path d=\"M14 10 H21.5 V12.5 A3.5 3.5 0 0 1 18 16 H17.5 A3.5 3.5 0 0 1 14 12.5 Z\"/><path d=\"M10 11 Q12 9.8 14 11\"/><path d=\"M2.5 10 L1.5 7.5\"/><path d=\"M21.5 10 L22.5 7.5\"/>", "all": "<rect x=\"4\" y=\"4\" width=\"7\" height=\"7\" rx=\"1\"/><rect x=\"13\" y=\"4\" width=\"7\" height=\"7\" rx=\"1\"/><rect x=\"4\" y=\"13\" width=\"7\" height=\"7\" rx=\"1\"/><rect x=\"13\" y=\"13\" width=\"7\" height=\"7\" rx=\"1\"/>", "new": "<path d=\"M9 3 H15 L19 7 V21 H5 V7 Z\"/><circle cx=\"12\" cy=\"7.5\" r=\"1.3\"/>", "bag": "<path d=\"M5 8 H19 L20 21 H4 Z\"/><path d=\"M9 8 V6.5 A3 3 0 0 1 15 6.5 V8\"/>", "truck": "<path d=\"M2.5 6.5 H14 V16.5 H2.5 Z\"/><path d=\"M14 10 H18.5 L21.5 13 V16.5 H14\"/><circle cx=\"7\" cy=\"17.8\" r=\"1.8\"/><circle cx=\"17.5\" cy=\"17.8\" r=\"1.8\"/>", "trash": "<path d=\"M5 7 H19\"/><path d=\"M9 7 V4.5 H15 V7\"/><path d=\"M6.5 7 L7.5 20 H16.5 L17.5 7\"/><path d=\"M10 11 V16\"/><path d=\"M14 11 V16\"/>", "heart": "<path d=\"M12 20 C12 20 4.5 15.4 4.5 9.6 A4 4 0 0 1 12 7.4 A4 4 0 0 1 19.5 9.6 C19.5 15.4 12 20 12 20 Z\"/>", "search": "<circle cx=\"11\" cy=\"11\" r=\"6.5\"/><path d=\"M16 16 L20.5 20.5\"/>", "menu": "<path d=\"M4 7 H20\"/><path d=\"M4 12 H20\"/><path d=\"M4 17 H20\"/>", "close": "<path d=\"M6 6 L18 18\"/><path d=\"M18 6 L6 18\"/>", "back": "<path d=\"M15 5 L8 12 L15 19\"/>", "chevron": "<path d=\"M6 9 L12 15 L18 9\"/>", "message": "<path d=\"M4 5 H20 V16 H9 L5 19.5 V16 H4 Z\"/>", "phone": "<rect x=\"7\" y=\"2.5\" width=\"10\" height=\"19\" rx=\"2\"/><path d=\"M11 18.5 H13\"/>", "mail": "<rect x=\"3\" y=\"5.5\" width=\"18\" height=\"13\" rx=\"1.5\"/><path d=\"M3.5 6.5 L12 13 L20.5 6.5\"/>", "calendar": "<rect x=\"3.5\" y=\"5\" width=\"17\" height=\"15.5\" rx=\"1.5\"/><path d=\"M3.5 10 H20.5\"/><path d=\"M8 3 V7\"/><path d=\"M16 3 V7\"/>", "check": "<path d=\"M5 12.5 L10 17.5 L19 7\"/>", "pin": "<path d=\"M12 21 C12 21 5.5 14.8 5.5 9.8 A6.5 6.5 0 0 1 18.5 9.8 C18.5 14.8 12 21 12 21 Z\"/><circle cx=\"12\" cy=\"9.8\" r=\"2.3\"/>", "clock": "<circle cx=\"12\" cy=\"12\" r=\"8.5\"/><path d=\"M12 7.5 V12 L15 14\"/>"};

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
      ['What we collect', 'Only what you give us when you contact us or request a visit: your name, email address, phone number (optional), the pieces in your cart, whether you want pickup or delivery, your delivery city if you choose delivery, preferred date and time if you book a visit, and your message. We do not ask for payment details because nothing is paid on this website.'],
      ['Why we collect it', 'To answer your questions, tell you about a piece and arrange your appointment. We do not use it for anything else, and we do not sell or rent it.'],
      ['Who sees it', 'Only the MtlMaison team. If you message us on Instagram or TikTok, those platforms handle your message under their own policies.'],
      ['Your device', 'This site saves your cart, your favourites and your language choice on your own device so they are there next time. This stays on your device, and you can clear it at any time in your browser settings.'],
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
      ['Ce que nous recueillons', 'Seulement ce que vous nous donnez lorsque vous nous écrivez ou demandez une visite : votre nom, votre courriel, votre téléphone (facultatif), les pièces de votre panier, votre choix de ramassage ou de livraison, votre ville de livraison si vous choisissez la livraison, la date et l’heure souhaitées si vous prenez rendez-vous, et votre message. Nous ne demandons aucun renseignement de paiement, car rien ne se vend sur ce site.'],
      ['Pourquoi nous le recueillons', 'Pour répondre à vos questions, vous renseigner sur une pièce et fixer votre rendez-vous. Nous ne l’utilisons à aucune autre fin, et nous ne le vendons ni ne le louons.'],
      ['Qui y a accès', 'Seulement l’équipe MtlMaison. Si vous nous écrivez sur Instagram ou TikTok, ces plateformes traitent votre message selon leurs propres politiques.'],
      ['Votre appareil', 'Ce site garde votre panier, vos favoris et votre choix de langue sur votre propre appareil pour les retrouver la prochaine fois. Cela reste sur votre appareil, et vous pouvez l’effacer en tout temps dans les paramètres de votre navigateur.'],
      ['Durée de conservation', 'Seulement le temps nécessaire pour traiter votre demande. Ensuite, nous la supprimons.'],
      ['Vos droits', 'Vous pouvez demander à voir, corriger ou supprimer vos renseignements, ou retirer votre consentement, en tout temps en écrivant à ' + c.email + '.']
    ]; }
  }
};


var T2 = {
  en: {
    cart: 'Cart', addCart: 'Add to cart', inCart: 'In cart', removeCart: 'Remove from cart', remove: 'Remove', addAllCart: 'Add all to cart',
    cartT: 'Your cart', cartHint: 'The more pieces you choose, the better your price.',
    cartEmpty: 'Your cart is empty', cartEmptyP: 'Add the pieces you like, then send us your request. Nothing to pay now.',
    methodT: 'How would you like to receive your pieces?',
    pickup: 'Pickup in Montréal', pickupP: 'We share the pickup address as soon as we agree on your price.',
    delivery: 'Delivery anywhere', deliveryP: 'We confirm the delivery cost together with your final price.',
    fPlace: 'City and country for delivery', yourDetails: 'Your details',
    errMethod: 'Please choose pickup or delivery.', errPlace: 'Please tell us the city for delivery.', errCart: 'Your cart is empty.',
    cartNote: 'Nothing to pay now. We email you a final price and you decide. Pieces are not held until you say “I’m in”.',
    sendReq: 'Send my request', sending: 'Sending…',
    sentCartT: 'Request sent', sentCartP: function (e) { return 'Thank you. We will email you at ' + e + ' with your final price.'; },
    refL: 'Your reference', refNote: 'Keep this reference. If you don’t see our email, check your spam folder.',
    nextT: 'What happens next',
    failT: 'We could not send your request.', failP: 'Please try again, or send it by email instead.', sendByMail: 'Send by email',
    howNav: 'How it works', fullDetails: 'See the full details',
    howLead: 'No online payment and no pressure. The whole process, in four steps.',
    sLabel: ['Choose', 'Send', 'Price', 'Decide'],
    sTitle: ['Fill your cart', 'Send your request', 'Get your price', 'You decide'],
    sText: [
      'Browse the collection and add the pieces you like to your cart. The more pieces you take, the better your price.',
      'Choose pickup in Montréal or delivery anywhere, add your email and send. There is nothing to pay at this point.',
      'We email you the final price for everything in your cart. If you chose delivery, the delivery cost is included.',
      'Look at the price and tell us what you think. There are two ways it can go:'],
    sShort: ['Add the pieces you like.', 'Pick pickup or delivery.', 'We email your final price.', 'Agree, or ask for changes.'],
    pickupDetail: 'We email you the pickup address once you say “I’m in”. Pickup is in Montréal.',
    deliveryDetail: 'We deliver anywhere. The delivery cost is confirmed with your final price.',
    branchIn: 'I’m in', branchChange: 'I’d like changes',
    inText: 'Click “I’m in” in our email. We then contact you about pickup or delivery, share the pickup address if you chose pickup, and give you the next steps.',
    changeText: 'Reply to our email or click the link in it and tell us what doesn’t work or what you would like to modify: fewer pieces, another price, anything. We will try to find a solution together.',
    back: 'Back', next: 'Next', stepOf: function (a, b) { return 'Step ' + a + ' of ' + b; },
    faqT: 'Quick answers',
    faq: [
      ['Do I pay now?', 'No. Nothing is paid on the website. You pay only after you agree on the price and we arrange pickup or delivery.'],
      ['How is the price decided?', 'Each piece is priced on request. The more pieces you take, the better your final price. We always send it to you by email first.'],
      ['Are my pieces held while we agree on a price?', 'No. Pieces stay available to everyone until you click “I’m in”, so reply quickly if you really want something.'],
      ['What if I don’t agree with the price?', 'No problem. Tell us what doesn’t work or what you would like to change and we will try to find a solution.'],
      ['Where is the pickup?', 'In Montréal. We share the exact address by email once we agree on everything.']],
    replyT: 'Your request', replyAsk: 'We sent you a price by email. What would you like to do?',
    imIn: 'I’m in', imInP: 'I agree with the price and everything else.',
    wantChanges: 'I’d like changes', wantChangesP: 'Tell us what doesn’t work or what to modify.',
    fRef: 'Reference', fChange: 'What would you like to change?', fOptEmail: 'Your email (optional)',
    confirmIn: 'Confirm “I’m in”', sendChanges: 'Send my changes',
    errRef: 'Please enter your reference.', errMsg: 'Please tell us what you would like to change.',
    doneIn: 'Great, thank you. We will contact you about pickup or delivery and the next steps.',
    doneChange: 'Thank you. We received your message and we will find a solution together.',
    replyFail: 'We could not send this. Please try again or email us.',
    byAppt: 'No payment online. Add pieces to your cart and we email you a final price. The more pieces, the better the price.',
    cartAdded: 'Added to your cart'
  },
  fr: {
    cart: 'Panier', addCart: 'Ajouter au panier', inCart: 'Au panier', removeCart: 'Retirer du panier', remove: 'Retirer', addAllCart: 'Tout ajouter au panier',
    cartT: 'Votre panier', cartHint: 'Plus vous choisissez de pièces, meilleur est votre prix.',
    cartEmpty: 'Votre panier est vide', cartEmptyP: 'Ajoutez les pièces qui vous plaisent, puis envoyez-nous votre demande. Rien à payer maintenant.',
    methodT: 'Comment souhaitez-vous recevoir vos pièces?',
    pickup: 'Ramassage à Montréal', pickupP: 'Nous vous donnons l’adresse de ramassage dès que le prix est convenu.',
    delivery: 'Livraison partout', deliveryP: 'Nous confirmons le coût de livraison avec votre prix final.',
    fPlace: 'Ville et pays de livraison', yourDetails: 'Vos coordonnées',
    errMethod: 'Veuillez choisir le ramassage ou la livraison.', errPlace: 'Veuillez indiquer la ville de livraison.', errCart: 'Votre panier est vide.',
    cartNote: 'Rien à payer maintenant. Nous vous envoyons un prix final par courriel et vous décidez. Les pièces ne sont pas réservées avant que vous disiez « J’en suis ».',
    sendReq: 'Envoyer ma demande', sending: 'Envoi…',
    sentCartT: 'Demande envoyée', sentCartP: function (e) { return 'Merci. Nous vous écrirons à ' + e + ' avec votre prix final.'; },
    refL: 'Votre référence', refNote: 'Gardez cette référence. Si vous ne voyez pas notre courriel, vérifiez vos pourriels.',
    nextT: 'Et ensuite',
    failT: 'Nous n’avons pas pu envoyer votre demande.', failP: 'Réessayez, ou envoyez-la plutôt par courriel.', sendByMail: 'Envoyer par courriel',
    howNav: 'Comment ça marche', fullDetails: 'Voir tous les détails',
    howLead: 'Pas de paiement en ligne et aucune pression. Tout le processus, en quatre étapes.',
    sLabel: ['Choisir', 'Envoyer', 'Prix', 'Décider'],
    sTitle: ['Remplissez votre panier', 'Envoyez votre demande', 'Recevez votre prix', 'Vous décidez'],
    sText: [
      'Parcourez la collection et ajoutez les pièces qui vous plaisent à votre panier. Plus vous prenez de pièces, meilleur est votre prix.',
      'Choisissez le ramassage à Montréal ou la livraison partout, ajoutez votre courriel et envoyez. Il n’y a rien à payer à cette étape.',
      'Nous vous envoyons par courriel le prix final pour tout ce qui est dans votre panier. Si vous avez choisi la livraison, son coût est inclus.',
      'Regardez le prix et dites-nous ce que vous en pensez. Deux possibilités :'],
    sShort: ['Ajoutez les pièces qui vous plaisent.', 'Ramassage ou livraison.', 'Nous écrivons votre prix final.', 'D’accord, ou demandez des changements.'],
    pickupDetail: 'Nous vous envoyons l’adresse de ramassage dès que vous dites « J’en suis ». Le ramassage se fait à Montréal.',
    deliveryDetail: 'Nous livrons partout. Le coût de livraison est confirmé avec votre prix final.',
    branchIn: 'J’en suis', branchChange: 'Je souhaite des changements',
    inText: 'Cliquez sur « J’en suis » dans notre courriel. Nous vous contactons ensuite au sujet du ramassage ou de la livraison, nous donnons l’adresse de ramassage si vous l’avez choisi, et nous vous indiquons les prochaines étapes.',
    changeText: 'Répondez à notre courriel ou cliquez sur le lien et dites-nous ce qui ne va pas ou ce que vous aimeriez modifier : moins de pièces, un autre prix, n’importe quoi. Nous chercherons une solution ensemble.',
    back: 'Retour', next: 'Suivant', stepOf: function (a, b) { return 'Étape ' + a + ' sur ' + b; },
    faqT: 'Réponses rapides',
    faq: [
      ['Est-ce que je paie maintenant?', 'Non. Rien ne se paie sur le site. Vous payez seulement après avoir accepté le prix et organisé le ramassage ou la livraison avec nous.'],
      ['Comment le prix est-il fixé?', 'Chaque pièce est offerte sur demande. Plus vous prenez de pièces, meilleur est votre prix final. Nous vous l’envoyons toujours d’abord par courriel.'],
      ['Mes pièces sont-elles réservées pendant que nous nous entendons sur le prix?', 'Non. Les pièces restent disponibles pour tout le monde jusqu’à ce que vous cliquiez sur « J’en suis ». Répondez vite si vous tenez vraiment à une pièce.'],
      ['Et si je ne suis pas d’accord avec le prix?', 'Aucun problème. Dites-nous ce qui ne va pas ou ce que vous aimeriez changer et nous chercherons une solution.'],
      ['Où se fait le ramassage?', 'À Montréal. Nous vous donnons l’adresse exacte par courriel une fois que tout est convenu.']],
    replyT: 'Votre demande', replyAsk: 'Nous vous avons envoyé un prix par courriel. Que souhaitez-vous faire?',
    imIn: 'J’en suis', imInP: 'Je suis d’accord avec le prix et le reste.',
    wantChanges: 'Je souhaite des changements', wantChangesP: 'Dites-nous ce qui ne va pas ou ce qu’il faut modifier.',
    fRef: 'Référence', fChange: 'Que souhaitez-vous modifier?', fOptEmail: 'Votre courriel (facultatif)',
    confirmIn: 'Confirmer « J’en suis »', sendChanges: 'Envoyer mes changements',
    errRef: 'Veuillez entrer votre référence.', errMsg: 'Veuillez nous dire ce que vous aimeriez modifier.',
    doneIn: 'Parfait, merci. Nous vous contacterons au sujet du ramassage ou de la livraison et des prochaines étapes.',
    doneChange: 'Merci. Nous avons reçu votre message et nous trouverons une solution ensemble.',
    replyFail: 'Nous n’avons pas pu envoyer ceci. Réessayez ou écrivez-nous.',
    byAppt: 'Aucun paiement en ligne. Ajoutez des pièces à votre panier et nous vous envoyons un prix final par courriel. Plus vous prenez de pièces, meilleur est le prix.',
    cartAdded: 'Ajouté à votre panier'
  }
};
['en', 'fr'].forEach(function (l) { for (var k in T2[l]) T[l][k] = T2[l][k]; });

/* ---------- clearer error messages (override earlier strings) ---------- */
var T3 = {
  en: {
    errName: 'Please type your name so we know who to reply to.',
    errEmail: 'Please type a valid email, like name@example.com. This is where we send your price.',
    errDate: 'Please choose the date you would like to visit.', errTime: 'Please choose a time for your visit.',
    errMethod: 'Please choose pickup or delivery.', errPlace: 'You chose delivery. Please type the city and country we should deliver to.',
    errCart: 'Your cart is empty. Add at least one piece, then send your request.',
    errReplyChoice: 'Please choose “I’m in” or “I’d like changes”.',
    errRef: 'Please type your reference. It is in our email and looks like MM-XXXXX.',
    errMsg: 'Please tell us what you would like to change.',
    errSumOne: 'One thing to fix before we can send this:', errSumMany: function (n) { return n + ' things to fix before we can send this:'; },
    errSumHelp: 'Tap a line to jump to it.',
    failTitle: 'We could not send your request',
    failOffline: 'Your device seems to be offline. Check your connection and press Send again. Your cart is saved.',
    failInvalid: 'Something is missing or not valid. Please check the fields marked above and press Send again.',
    failServer: 'Our email system did not accept your request. Nothing is lost and your cart is saved. Press Send again in a minute, or use the button below to send it from your own email app.',
    failBlocked: 'This page could not reach us. Please reload the page and try again, or send it by email instead.',
    replyFailOffline: 'Your device seems to be offline. Check your connection and press Send again.',
    replyFailInvalid: 'Something is missing or not valid. Please check your reference and try again.',
    replyFailServer: 'Our email system did not accept this. Please try again in a minute or email us directly.',
    e404T: 'Page not found', e404P: 'This page does not exist or has moved. The link may be old or mistyped. You can go back to the start or browse the collection.',
    errorT: 'Something went wrong', errorP: 'This page could not load. Your cart and favourites are safe. Please reload the page. If it keeps happening, message us on Instagram or by email.',
    reload: 'Reload the page', collection: 'Browse the collection', itemGone: 'This piece is no longer here. It may have been sold.'
  },
  fr: {
    errName: 'Veuillez écrire votre nom pour que nous sachions à qui répondre.',
    errEmail: 'Veuillez écrire un courriel valide, comme nom@exemple.com. C’est là que nous envoyons votre prix.',
    errDate: 'Veuillez choisir la date de votre visite.', errTime: 'Veuillez choisir l’heure de votre visite.',
    errMethod: 'Veuillez choisir le ramassage ou la livraison.', errPlace: 'Vous avez choisi la livraison. Veuillez écrire la ville et le pays de livraison.',
    errCart: 'Votre panier est vide. Ajoutez au moins une pièce, puis envoyez votre demande.',
    errReplyChoice: 'Veuillez choisir « Je suis partant » ou « Je voudrais des changements ».',
    errRef: 'Veuillez écrire votre référence. Elle est dans notre courriel et ressemble à MM-XXXXX.',
    errMsg: 'Veuillez nous dire ce que vous aimeriez modifier.',
    errSumOne: 'Une chose à corriger avant l’envoi :', errSumMany: function (n) { return n + ' choses à corriger avant l’envoi :'; },
    errSumHelp: 'Touchez une ligne pour y aller.',
    failTitle: 'Nous n’avons pas pu envoyer votre demande',
    failOffline: 'Votre appareil semble hors ligne. Vérifiez votre connexion et appuyez de nouveau sur Envoyer. Votre panier est conservé.',
    failInvalid: 'Il manque quelque chose ou une information n’est pas valide. Vérifiez les champs indiqués ci-dessus et réessayez.',
    failServer: 'Notre système de courriel n’a pas accepté votre demande. Rien n’est perdu et votre panier est conservé. Réessayez dans une minute, ou utilisez le bouton ci-dessous pour l’envoyer depuis votre application de courriel.',
    failBlocked: 'Cette page n’a pas pu nous joindre. Rechargez la page et réessayez, ou envoyez plutôt un courriel.',
    replyFailOffline: 'Votre appareil semble hors ligne. Vérifiez votre connexion et réessayez.',
    replyFailInvalid: 'Il manque quelque chose ou une information n’est pas valide. Vérifiez votre référence et réessayez.',
    replyFailServer: 'Notre système de courriel n’a pas accepté ceci. Réessayez dans une minute ou écrivez-nous directement.',
    e404T: 'Page introuvable', e404P: 'Cette page n’existe pas ou a été déplacée. Le lien est peut-être ancien ou mal écrit. Retournez à l’accueil ou parcourez la collection.',
    errorT: 'Un problème est survenu', errorP: 'Cette page n’a pas pu se charger. Votre panier et vos favoris sont en sécurité. Rechargez la page. Si cela continue, écrivez-nous sur Instagram ou par courriel.',
    reload: 'Recharger la page', collection: 'Voir la collection', itemGone: 'Cette pièce n’est plus ici. Elle a peut-être été vendue.'
  }
};
['en', 'fr'].forEach(function (l) { for (var k in T3[l]) T[l][k] = T3[l][k]; });

/* ---------- state ---------- */
function store(k, v) { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) { return null; } }
var lang = store('mm_lang') || ((navigator.language || '').toLowerCase().indexOf('fr') === 0 ? 'fr' : 'en');
if (lang !== 'fr') lang = 'en';
var favs = [];
try { favs = JSON.parse(store('mm_favs') || '[]'); } catch (e) { favs = []; }
var cart = [];
try { cart = JSON.parse(store('mm_cart') || '[]'); } catch (e) { cart = []; }
var S = { C: { method: '', place: '', name: '', email: '', phone: '', note: '' }, cartErr: {}, sending: false, sent: null, fail: false, how: { step: 0, branch: 'in', method: 'pickup' }, reply: { ref: '', choice: '', email: '', msg: '', err: {}, done: '', sending: false, fail: false }, popCart: null, menuAcc: false, menuAnim: false, sheetAnim: false, popId: null, bump: false, mega: false, menu: false, sheet: null, sort: 'new', size: '', favCat: 'all', booked: null, copied: false, errors: {}, form: { name: '', email: '', phone: '', date: '', time: '', note: '' }, q: '' };

function t(k) { var v = T[lang][k]; return v === undefined ? T.en[k] : v; }
function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
function ico(name, size, sw, fill) {
  var body = (ICONS[name] || '').replace(/__W2__/g, String((sw || 1.5) / 0.46));
  if (name === 'accessories') body = body.replace(/<g transform="([^"]+)" stroke-width="([^"]+)">/g, '<g transform="$1" stroke-width="$2"><g class="mini">').replace(/<\/g>/g, '</g></g>');
  return '<span class="ico" aria-hidden="true"><svg class="ic ic-' + name + '" viewBox="0 0 24 24" width="' + size + '" height="' + size + '" fill="' + (fill || 'none') + '" stroke="currentColor" stroke-width="' + (sw || 1.5) + '" stroke-linecap="round" stroke-linejoin="round">' + body + '</svg></span>';
}
function isFav(id) { return favs.indexOf(id) > -1; }
function isInCart(id) { return cart.indexOf(id) > -1; }
function saveCart() { store('mm_cart', JSON.stringify(cart)); }

var T4 = {
  en: {
    outBadge: 'Sold out', orderIt: 'We can order it', orderItBtn: 'Order it for me',
    outT: 'Not in stock right now', outP: 'We can order this piece for you. Add it to your cart like any other piece and we confirm availability, price and delay in the email we send you.',
    specialTag: 'Special order', specialMeta: 'We order it for you',
    cartSpecial: 'Special order: we confirm availability, price and delay in your email.',
    sentCartP2: function (e) { return 'Thank you. A confirmation is on its way to ' + e + ' (check your spam folder if you do not see it). We will email you your final price.'; },
    goneAsk: 'Ask us to find it',
    faqOut: ['What if a piece is sold out?', 'Tell us anyway. We can often order it for you. Add it to your cart as a special order and we confirm availability, price and delay in your email. You decide after that.']
  },
  fr: {
    outBadge: 'Épuisé', orderIt: 'Nous pouvons la commander', orderItBtn: 'Commandez-la pour moi',
    outT: 'Pas en stock pour le moment', outP: 'Nous pouvons commander cette pièce pour vous. Ajoutez-la au panier comme les autres et nous confirmons la disponibilité, le prix et le délai dans le courriel que nous vous envoyons.',
    specialTag: 'Commande spéciale', specialMeta: 'Nous la commandons pour vous',
    cartSpecial: 'Commande spéciale : nous confirmons la disponibilité, le prix et le délai dans votre courriel.',
    sentCartP2: function (e) { return 'Merci. Une confirmation est en route vers ' + e + ' (vérifiez vos courriels indésirables au besoin). Nous vous enverrons votre prix final.'; },
    goneAsk: 'Demandez-nous de la trouver',
    faqOut: ['Et si une pièce est épuisée?', 'Dites-le-nous quand même. Nous pouvons souvent la commander pour vous. Ajoutez-la au panier comme commande spéciale et nous confirmons la disponibilité, le prix et le délai dans votre courriel. Vous décidez ensuite.']
  }
};
['en', 'fr'].forEach(function (l) { for (var k in T4[l]) T[l][k] = T4[l][k]; T[l].faq = T[l].faq.concat([T4[l].faqOut]); });
function isOut(it) { return it && it.status === 'out'; }
function toggleCart(id) { var i = cart.indexOf(id); if (i > -1) cart.splice(i, 1); else cart.push(id); saveCart(); }
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
  if (h[0] === 'reply') return { n: 'reply', ref: h[1] || '' };
  if (['favourites', 'search', 'book', 'privacy', 'cart', 'how'].indexOf(h[0]) > -1) return { n: h[0] };
  return { n: '404' };
}

/* ---------- pieces ---------- */
function photoOf(it, big) {
  if (it.photos && it.photos[0]) return '<img src="assets/items/' + esc(it.photos[0]) + '" alt="' + esc(it.brand + ' ' + it.name) + '" loading="lazy">';
  return '<span style="color:var(--caramel)">' + ico(it.sub || it.cat, big ? 120 : 64, 1) + '</span>';
}
function card(it) {
  var on = isFav(it.id), inC = isInCart(it.id);
  return '<article class="card"><a class="open" href="#/p/' + encodeURIComponent(it.id) + '"><span class="ph">' + photoOf(it) + (isOut(it) ? '<span class="new out">' + t('outBadge') + '</span>' : it.isNew ? '<span class="new">' + t('new') + '</span>' : '') + '</span>' +
    '<span class="brand">' + esc(it.brand) + '</span><span class="pname">' + esc(it.name) + '</span>' +
    '<span class="meta">' + esc(it.size) + (it.condition ? ' · ' + esc(it.condition) : '') + '<br>' + (isOut(it) ? '<em class="special-tag">' + t('orderIt') + '</em>' : t('priceReq')) + '</span></a>' +
    '<button class="heart" data-act="fav" data-id="' + esc(it.id) + '" aria-pressed="' + on + '" aria-label="' + (on ? t('removeFav') : t('addFav')) + ': ' + esc(it.name) + '" style="color:' + (on ? 'var(--caramel)' : 'var(--espresso)') + '">' + ico('heart', 22, 1.6, on ? 'currentColor' : 'none') + '</button>' +
    '<button class="ask cartbtn' + (inC ? ' in' : '') + '" data-act="cart" data-id="' + esc(it.id) + '" aria-pressed="' + inC + '">' + (inC ? ico('check', 16, 1.8) + ' ' + t('inCart') : ico('bag', 16, 1.5) + ' ' + t(isOut(it) ? 'orderItBtn' : 'addCart')) + '</button></article>';
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
    '<div class="hdr"><div class="hdr-side">' + langBtn() + '</div>' + logo() + '<div class="hdr-side end"><a class="icon-btn" href="#/search" aria-label="' + t('search') + '">' + ico('search', 24) + '</a>' + favBtn() + cartBtn() + '</div></div>' +
    '<div class="hdr-m"><button class="icon-btn burger" data-act="menu" aria-label="' + t('menu') + '"><span class="bl"></span><span class="bl"></span><span class="bl"></span></button>' + logo() + '<span style="display:flex">' + '<a class="icon-btn" href="#/search" aria-label="' + t('search') + '">' + ico('search', 24) + '</a>' + favBtn() + cartBtn() + '</span></div>' +
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
  links += li('#/c/all', 'all', t('all')) + li('#/favourites', 'heart', t('favourites')) + li('#/cart', 'bag', t('cart')) + li('#/how', 'clock', t('howNav')) + li('#/book', 'calendar', t('bookVisit'));
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
    '<div><p class="lbl">' + t('shopL') + '</p><a href="#/c/new">' + t('new') + '</a><a href="#/c/all">' + t('all') + '</a><a href="#/favourites">' + t('favourites') + '</a><a href="#/cart">' + t('cart') + '</a><a href="#/how">' + t('howNav') + '</a><a href="#/book">' + t('bookVisit') + '</a></div>' +
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
  var sIc = ['bag', 'mail', 'new', 'check'];
  var steps = [0, 1, 2, 3].map(function (i) { return '<a class="step fx" href="#/how" style="text-decoration:none;color:inherit"><span style="color:var(--caramel)">' + ico(sIc[i], 34, 1.2) + '</span><p class="eyebrow">0' + (i + 1) + '</p><h3>' + t('sTitle')[i] + '</h3><p>' + t('sShort')[i] + '</p></a>'; }).join('');
  var why = [['w1t', 'w1p'], ['w2t', 'w2p'], ['w3t', 'w3p']].map(function (s) { return '<div class="why"><h3>' + t(s[0]) + '</h3><p>' + t(s[1]) + '</p></div>'; }).join('');
  return '<main id="main" tabindex="-1">' +
    '<section class="wrap hero"><div class="hero-text"><p class="eyebrow">Montréal</p><h1>' + t('heroT') + '</h1><p class="lead">' + t('heroP') + '</p><div class="hero-btns"><a class="btn" href="#/c/all">' + t('browse') + '</a><a class="btn-o" href="#/how">' + t('howNav') + '</a></div></div><div class="hero-art">' + tag + '</div></section>' +
    '<section class="alt sec"><div class="wrap"><div class="row-head" style="margin-bottom:28px"><h2 class="title">' + t('shopBy') + '</h2></div><div class="tiles">' + tiles + '</div></div></section>' +
    '<section class="sec"><div class="wrap"><div class="row-head" style="margin-bottom:28px"><h2 class="title">' + t('newIn') + '</h2><a class="btn-link" href="#/c/all">' + t('seeAll') + '</a></div>' + (news.length ? grid(news) : empty(t('noPieces'), t('noPiecesP'))) + '</div></section>' +
    '<section class="alt sec"><div class="wrap"><h2 class="title" style="margin-bottom:28px">' + t('howT') + '</h2><div class="steps">' + steps + '</div><p style="margin:28px 0 0"><a class="btn-link" href="#/how">' + t('fullDetails') + '</a></p></div></section>' +
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
  var it = byId(r.id); if (!it) return pageError(t('e404T'), t('itemGone'), '<button class="btn-o" data-act="ask-general">' + t('goneAsk') + '</button>');
  var on = isFav(it.id), inC = isInCart(it.id);
  var photos = it.photos || [];
  var thumbs = photos.length > 1 ? '<div class="thumbs">' + photos.slice(0, 4).map(function (p, i) { return '<button data-act="photo" data-i="' + i + '" aria-pressed="' + (i === (S.photo || 0)) + '" aria-label="Photo ' + (i + 1) + '"><img src="assets/items/' + esc(p) + '" alt=""></button>'; }).join('') + '</div>' : '';
  var main = photos.length ? '<img src="assets/items/' + esc(photos[Math.min(S.photo || 0, photos.length - 1)]) + '" alt="' + esc(it.brand + ' ' + it.name) + '">' : '<span style="color:var(--caramel)">' + ico(it.sub || it.cat, 140, 0.9) + '</span>';
  var related = ITEMS.filter(function (i) { return i.cat === it.cat && i.id !== it.id; }).slice(0, 4);
  var parts = [[t(it.cat), '#/c/' + it.cat]]; if (it.sub) parts.push([t(it.sub), '#/c/accessories/' + it.sub]); parts.push([esc(it.name)]);
  return '<main id="main" tabindex="-1" class="wrap page">' + crumbs(parts) +
    '<div class="item-wrap"><div class="gallery"><div class="ph" style="aspect-ratio:4/5">' + main + (isOut(it) ? '<span class="new out">' + t('outBadge') + '</span>' : it.isNew ? '<span class="new">' + t('new') + '</span>' : '') + '</div>' + thumbs + '</div>' +
    '<div class="info"><p class="brand" style="margin:0">' + esc(it.brand) + '</p><h1>' + esc(it.name) + '</h1><p class="serif" style="margin:0;font-size:28px">' + t('priceReq') + '</p>' +
    '<dl><dt>' + t('size') + '</dt><dd>' + esc(it.size) + '</dd><dt>' + t('condition') + '</dt><dd>' + esc(it.condition) + '</dd><dt>' + t('category') + '</dt><dd>' + esc(catLabel(it)) + '</dd><dt>' + t('ref') + '</dt><dd>' + esc(it.id) + '</dd></dl>' +
    (it.details ? '<p class="muted" style="margin:0">' + esc(it.details) + '</p>' : '') +
    (isOut(it) ? '<div class="outbox"><span class="fx" style="color:var(--caramel)">' + ico('truck', 26, 1.4) + '</span><div><strong>' + t('outT') + '</strong><p>' + t('outP') + '</p></div></div>' : '') +
    '<div class="actions"><button class="btn cartbtn" data-act="cart" data-id="' + esc(it.id) + '" aria-pressed="' + inC + '">' + ico(inC ? 'check' : 'bag', 20, 1.5) + (inC ? t('inCart') + ' · ' + t('removeCart') : t(isOut(it) ? 'orderItBtn' : 'addCart')) + '</button>' +
    '<button class="btn-o" data-act="fav" data-id="' + esc(it.id) + '" aria-pressed="' + on + '">' + ico('heart', 20, 1.5, on ? 'currentColor' : 'none') + (on ? t('saved') : t('save')) + '</button>' +
    '<button class="btn-o" data-act="ask" data-id="' + esc(it.id) + '">' + ico('message', 20, 1.5) + t('askPiece') + '</button></div>' +
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
    (list.length ? '<div class="hero-btns" style="padding:0"><button class="btn" data-act="cart-all">' + ico('bag', 20, 1.5) + t('addAllCart') + '</button><button class="btn-o" data-act="ask-favs">' + ico('message', 20, 1.5) + t('askAllFav') + '</button></div>' : '') + '</div>' + tabs +
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
    '<form data-act="book" novalidate style="display:flex;flex-direction:column;gap:20px">' + errSummary(er, ['name', 'email', 'date', 'time']) + '<div class="fields">' + fld('name', t('fName'), 'text', 'autocomplete="name"') + fld('email', t('fEmail'), 'email', 'autocomplete="email" inputmode="email"') + '</div>' +
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

/* ---------- cart ---------- */
function cartItems() { return cart.map(byId).filter(Boolean); }
function cartBtn() {
  return '<a class="icon-btn" href="#/cart" aria-label="' + t('cart') + (cart.length ? ' (' + cart.length + ')' : '') + '">' + ico('bag', 24) + (cart.length ? '<span class="badge">' + cart.length + '</span>' : '') + '</a>';
}
function cartRow(it) {
  return '<div class="cart-row"><a class="cart-th" href="#/p/' + encodeURIComponent(it.id) + '"><span class="ph">' + photoOf(it) + '</span></a><div class="cart-info"><span class="brand" style="margin:0">' + esc(it.brand) + '</span><a class="pname" href="#/p/' + encodeURIComponent(it.id) + '" style="color:inherit;text-decoration:none">' + esc(it.name) + '</a><span class="meta">' + esc(it.size) + (it.condition ? ' · ' + esc(it.condition) : '') + '<br>' + (isOut(it) ? '<em class="special-tag">' + t('specialTag') + '</em>' : t('priceReq')) + '</span></div>' +
    '<button class="icon-btn" data-act="cart-remove" data-id="' + esc(it.id) + '" aria-label="' + t('removeCart') + ': ' + esc(it.name) + '">' + ico('trash', 22, 1.4) + '</button></div>';
}
function cartFieldHtml(id, label, type, extra) {
  var er = S.cartErr[id];
  return '<label class="field">' + label + '<input id="c-' + id + '" type="' + type + '" value="' + esc(S.C[id]) + '" ' + (extra || '') + (er ? ' aria-invalid="true" aria-describedby="ce-' + id + '"' : '') + '>' + (er ? '<span class="alert" id="ce-' + id + '" role="alert" style="text-transform:none;letter-spacing:0">' + er + '</span>' : '') + '</label>';
}
function pageCart() {
  var head = crumbs([[t('cart')]]);
  if (S.sent) {
    var nx = [0, 2, 3].map(function (i, k) { return '<li>' + esc(t('sTitle')[i]) + '</li>'; }).join('');
    return '<main id="main" tabindex="-1" class="wrap page book">' + head + '<div class="done"><span class="done-ico" style="color:var(--caramel)">' + ico('check', 56, 1.4) + '</span><h1>' + t('sentCartT') + '</h1><p>' + esc(S.sent.mailed ? t('sentCartP2')(S.sent.email) : t('sentCartP')(S.sent.email)) + '</p>' +
      '<p class="refbox"><span class="eyebrow">' + t('refL') + '</span><strong class="serif">' + esc(S.sent.ref) + '</strong></p><p class="muted" style="margin:0">' + t('refNote') + '</p>' +
      '<div class="hero-btns" style="width:100%"><a class="btn" href="#/how">' + t('howNav') + '</a><a class="btn-o" href="#/c/all">' + t('browse') + '</a></div></div></main>';
  }
  var items = cartItems();
  if (!items.length) {
    return '<main id="main" tabindex="-1" class="wrap page">' + head + '<h1>' + t('cartT') + '</h1>' + '<div class="empty"><span style="color:var(--caramel)">' + ico('bag', 44, 1.2) + '</span><h2 class="serif" style="margin:0;font-size:30px">' + t('cartEmpty') + '</h2><p class="muted">' + t('cartEmptyP') + '</p><a class="btn" href="#/c/all">' + t('browse') + '</a></div></main>';
  }
  var C = S.C, er = S.cartErr;
  var methods = '<fieldset><legend id="m-l">' + t('methodT') + '</legend><div class="mopts" role="radiogroup" aria-labelledby="m-l">' +
    [['pickup', 'pin'], ['delivery', 'truck']].map(function (m) { var on = C.method === m[0]; return '<button type="button" class="mopt' + (on ? ' on' : '') + '" role="radio" aria-checked="' + on + '" data-act="method" data-m="' + m[0] + '"><span class="fx">' + ico(m[1], 30, 1.3) + '</span><strong>' + t(m[0]) + '</strong><span>' + t(m[0] + 'P') + '</span></button>'; }).join('') + '</div>' + (er.method ? '<p class="alert" role="alert">' + er.method + '</p>' : '') + '</fieldset>';
  var place = C.method === 'delivery' ? cartFieldHtml('place', t('fPlace'), 'text', 'autocomplete="address-level2"') : '';
  return '<main id="main" tabindex="-1" class="wrap page">' + head + '<div class="cat-head"><div class="cat-title"><span class="cat-ico fx" style="color:var(--caramel)">' + ico('bag', 44, 1.2) + '</span><div><h1>' + t('cartT') + '</h1><p class="count">' + plural(items.length) + '</p></div></div></div>' +
    '<p class="hint">' + ico('new', 20, 1.4) + '<span>' + t('cartHint') + '</span></p>' + (items.some(isOut) ? '<p class="hint">' + ico('truck', 20, 1.4) + '<span>' + t('cartSpecial') + '</span></p>' : '') +
    '<div class="cart-grid"><div class="cart-list">' + items.map(cartRow).join('') + '<a class="btn-link" href="#/c/all" style="margin-top:12px">' + t('browse') + '</a></div>' +
    '<form class="cart-form" data-act="cart-send" novalidate>' + errSummary(er, ['method', 'place', 'name', 'email']) + methods + place +
    '<h2 class="serif" style="margin:6px 0 0;font-size:26px;font-weight:400">' + t('yourDetails') + '</h2>' +
    '<div class="fields">' + cartFieldHtml('name', t('fName'), 'text', 'autocomplete="name"') + cartFieldHtml('email', t('fEmail'), 'email', 'autocomplete="email" inputmode="email"') + '</div>' +
    cartFieldHtml('phone', t('fPhone'), 'tel', 'autocomplete="tel"') + cartFieldHtml('note', t('fNote'), 'text') +
    '<input class="hp" id="c-website" type="text" tabindex="-1" autocomplete="off" aria-hidden="true">' +
    '<p class="note">' + ico('check', 18, 1.5) + '<span>' + t('cartNote') + '</span></p>' +
    (S.fail ? '<div class="alert" role="alert" id="errsum" tabindex="-1"><strong>' + t('failTitle') + '</strong><p style="margin:6px 0 8px">' + failText(S.failCode, 'cart') + '</p><button type="button" class="btn-link" data-act="cart-mail" style="min-height:36px">' + t('sendByMail') + '</button></div>' : '') +
    '<button class="btn" type="submit"' + (S.sending ? ' disabled' : '') + '>' + ico('mail', 20, 1.5) + (S.sending ? t('sending') : t('sendReq')) + '</button>' +
    '<p class="note" style="font-size:13px">' + t('privNote') + ' <a href="#/privacy">' + t('privLink') + '</a></p></form></div></main>';
}
function cartText() {
  var C = S.C, fr = lang === 'fr';
  return (fr ? 'Demande · MtlMaison' : 'Request · MtlMaison') + '\n\n' + (fr ? 'Nom : ' : 'Name: ') + C.name.trim() + '\n' + (fr ? 'Courriel : ' : 'Email: ') + C.email.trim() + '\n' + (C.phone.trim() ? (fr ? 'Téléphone : ' : 'Phone: ') + C.phone.trim() + '\n' : '') +
    (fr ? 'Mode : ' : 'Method: ') + (C.method === 'delivery' ? t('delivery') + (C.place.trim() ? ' (' + C.place.trim() + ')' : '') : t('pickup')) + '\n' + (C.note.trim() ? '\n' + C.note.trim() + '\n' : '') + '\n' + (fr ? 'Pièces :' : 'Pieces:') + '\n' + cartItems().map(function (i) { return '- ' + itemLabel(i) + (isOut(i) ? ' [' + t('specialTag') + ']' : ''); }).join('\n');
}

/* ---------- how it works ---------- */
function pageHow() {
  var H = S.how, n = 4, i = H.step, icons = ['bag', 'mail', 'new', 'check'];
  var stp = t('sLabel').map(function (l, k) {
    return '<button class="stp' + (k === i ? ' on' : '') + (k < i ? ' done' : '') + '" role="tab" aria-selected="' + (k === i) + '" data-act="how-step" data-s="' + k + '"><span class="num">' + (k < i ? ico('check', 18, 2) : (k + 1)) + '</span><span class="lb">' + l + '</span></button>';
  }).join('');
  var extra = '';
  if (i === 1) {
    extra = '<div class="chips" style="margin-top:6px"><button class="chip' + (H.method === 'pickup' ? ' on' : '') + '" data-act="how-method" data-m="pickup" aria-pressed="' + (H.method === 'pickup') + '">' + ico('pin', 18, 1.5) + t('pickup') + '</button><button class="chip' + (H.method === 'delivery' ? ' on' : '') + '" data-act="how-method" data-m="delivery" aria-pressed="' + (H.method === 'delivery') + '">' + ico('truck', 18, 1.5) + t('delivery') + '</button></div><p class="msg" style="margin:0">' + t(H.method + 'Detail') + '</p>';
  } else if (i === 3) {
    extra = '<div class="chips"><button class="chip' + (H.branch === 'in' ? ' on' : '') + '" data-act="how-branch" data-b="in" aria-pressed="' + (H.branch === 'in') + '">' + ico('check', 18, 1.6) + t('branchIn') + '</button><button class="chip' + (H.branch === 'change' ? ' on' : '') + '" data-act="how-branch" data-b="change" aria-pressed="' + (H.branch === 'change') + '">' + ico('message', 18, 1.5) + t('branchChange') + '</button></div><p class="msg" style="margin:0">' + t(H.branch === 'in' ? 'inText' : 'changeText') + '</p>';
  }
  var faq = t('faq').map(function (q) { return '<details class="faq"><summary>' + q[0] + '<span class="chev">' + ico('chevron', 20, 1.6) + '</span></summary><p>' + q[1] + '</p></details>'; }).join('');
  return '<main id="main" tabindex="-1" class="wrap page how">' + crumbs([[t('howNav')]]) + '<h1>' + t('howNav') + '</h1><p class="muted" style="margin:0;max-width:34em">' + t('howLead') + '</p>' +
    '<div class="stepper" role="tablist" style="--p:' + (i / (n - 1) * 100) + '%"><div class="track"><div class="fill"></div></div>' + stp + '</div>' +
    '<section class="how-panel" role="tabpanel"><span class="how-ico fx" style="color:var(--caramel)">' + ico(icons[i], 56, 1.1) + '</span><div class="how-body"><p class="eyebrow">' + t('stepOf')(i + 1, n) + '</p><h2 class="serif">' + t('sTitle')[i] + '</h2><p>' + t('sText')[i] + '</p>' + extra + '</div></section>' +
    '<div class="how-nav"><button class="btn-o" data-act="how-go" data-d="-1"' + (i === 0 ? ' disabled' : '') + '>' + t('back') + '</button>' + (i < n - 1 ? '<button class="btn" data-act="how-go" data-d="1">' + t('next') + '</button>' : '<a class="btn" href="#/c/all">' + t('browse') + '</a>') + '</div>' +
    '<h2 class="title" style="margin-top:28px">' + t('faqT') + '</h2><div class="faqs">' + faq + '</div></main>';
}

/* ---------- reply (I'm in / changes) ---------- */
function pageReply(r) {
  var R = S.reply;
  if (r.ref && !R.ref) R.ref = r.ref.toUpperCase();
  var er = R.err;
  var head = crumbs([[t('replyT')]]) + '<h1>' + t('replyT') + '</h1>';
  if (R.done) {
    return '<main id="main" tabindex="-1" class="wrap page book">' + head + '<div class="done"><span class="done-ico" style="color:var(--caramel)">' + ico('check', 56, 1.4) + '</span><p>' + t(R.done === 'in' ? 'doneIn' : 'doneChange') + '</p><a class="btn" href="#/">' + t('backHome') + '</a></div></main>';
  }
  var ch = [['in', 'check', 'imIn', 'imInP'], ['change', 'message', 'wantChanges', 'wantChangesP']].map(function (c) { var on = R.choice === c[0]; return '<button type="button" class="mopt' + (on ? ' on' : '') + '" role="radio" aria-checked="' + on + '" data-act="reply-choice" data-c="' + c[0] + '"><span class="fx">' + ico(c[1], 30, 1.4) + '</span><strong>' + t(c[2]) + '</strong><span>' + t(c[3]) + '</span></button>'; }).join('');
  function fl(id, label, type, extra) { return '<label class="field">' + label + '<input id="r-' + id + '" type="' + type + '" value="' + esc(R[id]) + '" ' + (extra || '') + (er[id] ? ' aria-invalid="true"' : '') + '>' + (er[id] ? '<span class="alert" role="alert" style="text-transform:none;letter-spacing:0">' + er[id] + '</span>' : '') + '</label>'; }
  return '<main id="main" tabindex="-1" class="wrap page book">' + head + '<p class="muted" style="margin:0">' + t('replyAsk') + '</p>' +
    '<form data-act="reply-send" novalidate style="display:flex;flex-direction:column;gap:18px">' + errSummary(er, ['choice', 'ref', 'msg', 'email']) + '<div class="mopts" role="radiogroup" id="r-choice">' + ch + '</div>' +
    fl('ref', t('fRef'), 'text', 'autocomplete="off" autocapitalize="characters"') +
    (R.choice === 'change' ? '<label class="field">' + t('fChange') + '<textarea id="r-msg" rows="4"' + (er.msg ? ' aria-invalid="true"' : '') + '>' + esc(R.msg) + '</textarea>' + (er.msg ? '<span class="alert" role="alert" style="text-transform:none;letter-spacing:0">' + er.msg + '</span>' : '') + '</label>' : '') +
    fl('email', t('fOptEmail'), 'email', 'autocomplete="email" inputmode="email"') +
    '<input class="hp" id="r-website" type="text" tabindex="-1" autocomplete="off" aria-hidden="true">' +
    (R.fail ? '<div class="alert" role="alert" id="errsum" tabindex="-1"><strong>' + t('failTitle') + '</strong><p style="margin:6px 0 0">' + failText(R.failCode, 'reply') + '</p></div>' : '') +
    '<button class="btn" type="submit"' + (R.sending ? ' disabled' : '') + '>' + (R.sending ? t('sending') : R.choice === 'change' ? t('sendChanges') : t('confirmIn')) + '</button></form></main>';
}


function errSummary(errs, order) {
  var keys = order.filter(function (k) { return errs[k]; });
  if (!keys.length) return '';
  var title = keys.length === 1 ? t('errSumOne') : t('errSumMany')(keys.length);
  return '<div class="alert errsum" id="errsum" role="alert" tabindex="-1"><strong>' + title + '</strong><ul>' +
    keys.map(function (k) { return '<li><a href="#" data-act="goto" data-f="' + esc(k.f || k) + '">' + errs[k] + '</a></li>'; }).join('') + '</ul></div>';
}
function failText(code, kind) {
  var pre = kind === 'reply' ? 'replyFail' : 'fail';
  if (code === 'offline') return t(pre + 'Offline');
  if (code === 'invalid') return t(pre + 'Invalid');
  if (kind !== 'reply' && (code === 'origin' || code === 'notfound' || code === 'method' || code === 'json')) return t('failBlocked');
  return t(pre + 'Server');
}
function pageError(title, text, extra) {
  return '<main id="main" tabindex="-1" class="wrap page errpage"><p class="eyebrow">' + title + '</p><h1>' + title + '</h1><p class="muted" style="max-width:56ch">' + text + '</p>' +
    '<div class="hero-btns"><a class="btn" href="#/">' + t('backHome') + '</a><a class="btn-o" href="#/c/all">' + t('collection') + '</a>' + (extra || '') + '</div></main>';
}
function page404() { return pageError(t('e404T'), t('e404P')); }

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
  if (r.n === 'cart') return t('cartT') + ' · ' + base;
  if (r.n === 'how') return t('howNav') + ' · ' + base;
  if (r.n === 'reply') return t('replyT') + ' · ' + base;
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
function renderFatal() {
  try { appEl.innerHTML = '<div class="wrap" style="padding-top:48px"><a class="brand-fallback serif" href="#/" style="font-size:28px;text-decoration:none;color:inherit">MtlMaison</a></div>' + pageError(t('errorT'), t('errorP')).replace('<a class="btn" href="#/">' + t('backHome') + '</a>', '<button class="btn" type="button" onclick="location.reload()">' + t('reload') + '</button>'); } catch (e2) { appEl.textContent = 'MtlMaison: something went wrong. Please reload the page.'; }
}
function render(keepScroll) {
  try { renderMain(keepScroll); } catch (err) { if (window.console) console.error(err); renderFatal(); }
}
function renderMain(keepScroll) {
  var r = route(), y = window.scrollY;
  var animMenu = S.menuAnim, animSheet = S.sheetAnim; S.menuAnim = false; S.sheetAnim = false;
  var body = { home: pageHome, cat: pageCat, item: pageItem, favourites: pageFavs, search: pageSearch, book: pageBook, privacy: pagePrivacy, cart: pageCart, how: pageHow, reply: pageReply }[r.n];
  appEl.innerHTML = header(r) + (body ? body(r) : page404()) + footer() + mobileMenu(!animMenu) + sheetHtml(!animSheet) +
    ((S.menu || S.sheet) ? '' : '<button class="fab" data-act="ask-general" aria-label="' + t('contactUs') + '">' + ico('message', 26, 1.5) + '</button>');
  document.documentElement.lang = lang;
  document.title = titleFor(r);
  document.body.style.overflow = (S.menu || S.sheet) ? 'hidden' : '';
  var main = document.getElementById('main'); if (main && !keepScroll) main.classList.add('enter');
  decorate(keepScroll);
  if (S.popId) { var hs = appEl.querySelectorAll('[data-act="fav"][data-id="' + S.popId + '"]'); for (var i = 0; i < hs.length; i++) hs[i].classList.add('beat'); S.popId = null; }
  if (S.popCart) { var cs = appEl.querySelectorAll('[data-act="cart"][data-id="' + S.popCart + '"]'); for (var q = 0; q < cs.length; q++) cs[q].classList.add('added'); S.popCart = null; }
  if (S.bump) { var bs = appEl.querySelectorAll('.badge'); for (var k = 0; k < bs.length; k++) bs[k].classList.add('bump'); S.bump = false; }
  if (keepScroll) window.scrollTo(0, y);
  if (animSheet) { var x = document.getElementById('sheet-x'); if (x) x.focus(); }
  onScroll();
}
function go() { S.sent = null; S.fail = false; S.cartErr = {}; S.reply = { ref: '', choice: '', email: '', msg: '', err: {}, done: '', sending: false, fail: false }; S.mega = false; S.menu = false; S.photo = 0; S.size = ''; if (route().n !== 'book') S.booked = null; render(false); window.scrollTo(0, 0); }
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
  if (a === 'goto') { ev.preventDefault(); var gf = el.getAttribute('data-f'); var ge = document.getElementById('c-' + gf) || document.getElementById('f-' + gf) || document.getElementById('r-' + gf) || document.querySelector('.mopt'); if (ge) { ge.scrollIntoView({ block: 'center' }); ge.focus({ preventScroll: true }); } return; }
  if (a === 'copy-keep') return;
  if (el.tagName !== 'A') ev.preventDefault();
  if (a === 'fav') { toggleFav(id); S.popId = id; S.bump = true; render(true); }
  else if (a === 'cart') { toggleCart(id); S.popCart = isInCart(id) ? id : null; S.bump = true; render(true); }
  else if (a === 'cart-remove') { toggleCart(id); render(true); }
  else if (a === 'cart-all') { favs.forEach(function (f) { if (byId(f) && !isInCart(f)) cart.push(f); }); saveCart(); S.bump = true; render(true); }
  else if (a === 'method') { S.C.method = el.getAttribute('data-m'); S.cartErr.method = ''; render(true); }
  else if (a === 'cart-mail') { location.href = 'mailto:' + CONFIG.email + '?subject=' + encodeURIComponent('MtlMaison') + '&body=' + encodeURIComponent(cartText()); }
  else if (a === 'how-step') { S.how.step = +el.getAttribute('data-s'); render(true); }
  else if (a === 'how-go') { S.how.step = Math.max(0, Math.min(3, S.how.step + (+el.getAttribute('data-d')))); render(true); }
  else if (a === 'how-method') { S.how.method = el.getAttribute('data-m'); render(true); }
  else if (a === 'how-branch') { S.how.branch = el.getAttribute('data-b'); render(true); }
  else if (a === 'reply-choice') { S.reply.choice = el.getAttribute('data-c'); S.reply.err = {}; render(true); }
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
  else if (tg.id && tg.id.indexOf('c-') === 0) { var k = tg.id.slice(2); S.C[k] = tg.value; if (S.cartErr[k]) { S.cartErr[k] = ''; var ae = document.getElementById('ce-' + k); if (ae) ae.remove(); tg.removeAttribute('aria-invalid'); } }
  else if (tg.id && tg.id.indexOf('r-') === 0) S.reply[tg.id.slice(2)] = tg.value;
});
function postJSON(url, data) {
  function bad(code, j) { var e = new Error('fail'); e.code = code; e.fields = (j && j.fields) || []; return e; }
  return fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }).then(function (r) {
    return r.json().then(function (j) { if (!r.ok || !j.ok) throw bad((j && j.error) || ('http' + r.status), j); return j; }, function () { throw bad('http' + r.status); });
  }, function () { throw bad('offline'); });
}
function focusFirstError() { var e = document.getElementById('errsum') || document.querySelector('[aria-invalid="true"]'); if (e) { if (e.scrollIntoView) e.scrollIntoView({ block: 'center' }); if (e.focus) e.focus({ preventScroll: true }); } }
function submitCart() {
  var C = S.C, e = {};
  if (!cartItems().length) e.cart = t('errCart');
  if (!C.method) e.method = t('errMethod');
  if (C.method === 'delivery' && !C.place.trim()) e.place = t('errPlace');
  if (!C.name.trim()) e.name = t('errName');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(C.email.trim())) e.email = t('errEmail');
  S.cartErr = e; S.fail = false;
  if (Object.keys(e).length) { render(true); focusFirstError(); return; }
  S.sending = true; render(true);
  var email = C.email.trim();
  postJSON('/api/request', { lang: lang, name: C.name.trim(), email: email, phone: C.phone.trim(), method: C.method, place: C.place.trim(), note: C.note.trim(), website: C.website || '', items: cartItems().map(function (i) { return { id: i.id, label: itemLabel(i), special: isOut(i) }; }) })
    .then(function (j) { S.sending = false; S.sent = { ref: j.ref, email: email, mailed: !!j.mailed }; cart = []; saveCart(); S.bump = false; render(false); window.scrollTo(0, 0); })
    .catch(function (er) {
      S.sending = false; S.failCode = er && er.code; S.fail = true;
      if (er && er.code === 'invalid' && er.fields && er.fields.length) {
        var map = { cart: 'errCart', method: 'errMethod', place: 'errPlace', name: 'errName', email: 'errEmail' }, ce = {};
        er.fields.forEach(function (k) { if (map[k]) ce[k] = t(map[k]); });
        if (Object.keys(ce).length) { S.cartErr = ce; S.fail = false; }
      }
      render(true); focusFirstError();
    });
}
function submitReply() {
  var R = S.reply, e = {};
  if (!R.choice) e.choice = t('errReplyChoice');
  if (!R.ref.trim()) e.ref = t('errRef');
  if (R.choice === 'change' && !R.msg.trim()) e.msg = t('errMsg');
  if (R.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(R.email.trim())) e.email = t('errEmail');
  R.err = e; R.fail = false;
  if (Object.keys(e).length) { render(true); focusFirstError(); return; }
  R.sending = true; render(true);
  postJSON('/api/reply', { lang: lang, ref: R.ref.trim().toUpperCase(), type: R.choice, message: R.msg.trim(), email: R.email.trim(), website: R.website || '' })
    .then(function () { R.sending = false; R.done = R.choice; render(false); window.scrollTo(0, 0); })
    .catch(function (er) { R.sending = false; R.failCode = er && er.code; R.fail = true; render(true); focusFirstError(); });
}
document.addEventListener('submit', function (ev) {
  var f = ev.target, act = f.getAttribute('data-act');
  if (act === 'cart-send') { ev.preventDefault(); submitCart(); return; }
  if (act === 'reply-send') { ev.preventDefault(); submitReply(); return; }
  if (act !== 'book') return;
  ev.preventDefault();
  S.errors = validate();
  var keys = Object.keys(S.errors);
  if (keys.length) { render(true); focusFirstError(); return; }
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
