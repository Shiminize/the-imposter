const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/features/reader/data.js');

try {
    let content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');
    let chapterIndex = -1;
    let insertionIndex = -1;

    // Translation for Chapter 3
    const titleFr = 'Chapitre 3 : Première Lumière, Premiers Mensonges (Jour 1 à Hårga)';

    // French Content (Nordic Noir Style)
    // Drafting the translation based on key plot points and atmosphere.
    // Oppressive light, lack of privacy, "discovering" transparency.

    const contentFr = `<p>La porte du chalet s'ouvrit sur des gonds silencieux.</p>
<p>À l'intérieur, six lits longeaient les murs—trois de chaque côté, séparés par rien. Pas de cloisons, pas de rideaux, pas de portes. Juste des draps en lin blanc tendus sur des matelas fins, chaque lit faisant face à son opposé comme des témoins.</p>
<p>Les fenêtres étaient placées trop haut pour voir dehors. Seul le ciel était visible. Le Soleil de Minuit se déversait sans entrave, peignant tout de la couleur de la surexposition.</p>
<p>« Vos quartiers de sommeil. » Saga se déplaça entre les lits, faisant un geste. « Nous trouvons que les murs créent des barrières émotionnelles. Cette ouverture encourage une connexion authentique. »</p>
<p>Mia s'arrêta juste à l'intérieur du seuil. « Vous êtes sérieux. »</p>
<p>« L'intimité peut devenir de l'isolement. » Le ton de Saga restait plaisant, éducatif. « Ici, nous pratiquons la vulnérabilité comme une discipline quotidienne. »</p>
<p>Kyle scanna la pièce. Pas de verrous sur les portes intérieures. Pas d'espace personnel sauf l'étroite bande à côté de chaque lit. Chaque respiration, chaque mouvement, chaque cauchemar—audible pour cinq autres personnes.</p>
<p>La partie forensique de son esprit catalogua cela : élimination architecturale de la solitude, exposition forcée, privation de sommeil par le bruit ambiant et la lumière perpétuelle.</p>
<p>Le reste de lui sentit ses poumons se contracter.</p>
<p>Bobi entra le dernier, les mains agrippant les bretelles de son sac à dos. Il jeta un coup d'œil aux lits, aux fenêtres, à la porte qui ne fermait pas à clé.</p>
<p>« Le lin blanc est dans le coffre au pied de chaque lit. » Saga traversa vers le plus proche, soulevant le couvercle. Tissu plié, blanc crème, doux des lavages répétés. « Toutes les tailles. Choisissez ce qui vous va. Repas et sessions, nous demandons que vous portiez ceci. Cela crée l'unité. »</p>
<p>Elle extrait une tunique et un pantalon, les tint comme une offrande.</p>
<p>L'expression de Julia devint plate. « On se change maintenant ? »</p>
<p>« À votre confort. » Saga posa les vêtements sur le lit. « Le dîner est à dix-neuf heures. Paula introduira le cadre de la semaine à ce moment-là. »</p>
<p>Elle se dirigea vers la porte, marqua une pause.</p>
<p>« Encore une chose—le pont que vous avez traversé. Durant les fortes pluies, la rivière monte. Parfois elle devient infranchissable pour un jour ou deux. Juste quelque chose à savoir. »</p>
<p>Les mots atterrirent doucement. Informatifs.</p>
<p>Kyle entendit le sous-texte : <em>Vous ne pouvez pas partir quand vous voulez.</em></p>
<p>Saga sourit. « Je vous laisse vous installer. »</p>
<p>La porte se referma derrière elle.</p>
<p>Six personnes se tenaient dans la chambre blanche, entourées de lits sans murs entre eux, tenant des vêtements conçus pour effacer qui ils étaient.</p>
<p>Dehors, le chant des oiseaux continuait. Dedans, personne ne parlait.</p>
<p>Mia laissa tomber son sac sur le lit le plus proche, fixant le lin plié.</p>
<p>Klaudia ouvrit la porte alors que Saga réapparaissait, tenant une boîte en bois avec un couvercle à charnière.</p>
<p>« Pour les appareils. » Elle la posa sur la table centrale. « Optionnel, bien sûr. Certains invités trouvent plus facile de se déconnecter complètement. »</p>
<p>La main de Kyle bougea vers sa poche. Son téléphone reposait contre sa paume, chaud de la proximité de son corps. Chaque note forensique, chaque contact, chaque motif qu'il avait enregistré pour GlowGlitch—compressé dans du verre et du silicium.</p>
<p>Il le plaça dans la boîte.</p>
<p>Le clic du bois sur le verre ressembla à une amputation.</p>
<p>Julia tira le sien de son jean, fixa l'écran. Le dernier message de Marc encore visible. Elle hésita, le pouce planant sur le bouton d'alimentation, puis le laissa tomber à côté de celui de Kyle.</p>
<p>« Voilà. » Sa voix portait du défi, bien que sa main restât serrée.</p>
<p>Bobi se tenait immobile, sac à dos encore sanglé sur ses épaules. Son téléphone était déjà dans la boîte—il l'avait rendu le premier, les mains tremblantes. Maintenant elles pendaient à ses côtés, doigts tressaillants.</p>
<p>Vide.</p>
<p>Saga sourit. « Merveilleux. Je garderai ceci dans le chalet administratif. Dès que vous en aurez besoin, demandez simplement. »</p>
<p>Elle souleva la boîte, marcha vers la porte.</p>
<p>Kyle regarda sa connexion au monde extérieur disparaître dans la lumière dorée.</p>
<p>La Maison Longue s'étendait devant eux, poutres en bois s'arquant au-dessus comme des côtes. Des guirlandes de fleurs sauvages drapaient chaque solive—lupins, bleuets, cerfeuil sauvage—leur douceur assez épaisse pour tapisser le fond de la gorge de Kyle.</p>
<p>Deux longues tables couraient sur la longueur de la salle, chacune bordée de bancs. Pas de nappes. Pas de cloisons. Chaque surface en bois pâle, récurée, reflétant le Soleil de Minuit qui se déversait par des fenêtres placées trop haut dans les murs.</p>
<p>Paula se tenait à l'extrémité, mains jointes. Robe en lin blanc, fleurs sauvages tressées dans ses cheveux. Cette même chaleur répétée que Kyle avait observée dans la prairie.</p>
<p>« S'il vous plaît. Asseyez-vous où cela semble juste. »</p>
<p>Où cela semble juste. Comme si le choix existait dans une pièce avec deux tables et vingt-trois personnes.</p>
<p>Mia choisit le milieu de la table de gauche, se laissant tomber sur le banc avec une force territoriale. Bobi plana près de la porte jusqu'à ce que Julia le frôle, sélectionnant une place à trois sièges de Mia. Eline prit la position du bout, dos au mur.</p>
<p>Kyle mesura les distances. Quatre pieds entre Mia et Julia. Huit pieds jusqu'aux autres invités les plus proches—trois femmes en lin blanc identique, cheveux tressés, regardant.</p>
<p>Il s'assit en face d'Eline. Klaudia s'installa à côté de lui.</p>
<p>Les autres invités remplirent l'espace autour d'eux. Un jeune homme aux yeux creux. Une femme plus âgée dont les mains ne s'arrêtaient jamais de bouger. Deux couples qui s'assirent si près que leurs épaules se touchaient. Tout le monde en lin blanc sauf le groupe de Kyle, encore en vêtements de voyage—jeans, tissus sombres, individuels.</p>
<p>Voyants.</p>
<p>Des bols apparurent. Des serveurs en lin blanc se déplaçaient entre les tables, posant pain, beurre, soupe froide de concombre, légumes rôtis. Pas de viande. Tout vert pâle ou crème ou doré lin.</p>
<p>L'acoustique était chirurgicale. Chaque raclement de cuillère contre la céramique, chaque respiration, chaque froissement de tissu—amplifié. Kyle entendit quelqu'un à trois tables de là avaler de l'eau.</p>
<p>Le couteau de Mia heurta son assiette. Le son ricocha sur les poutres.</p>
<p>Julia croisa son regard à travers la table. Sa fourchette s'arrêta à mi-chemin de sa bouche.</p>
<p>La femme plus âgée se pencha vers Mia. « Première fois à Hårga ? »</p>
<p>« Oui. »</p>
<p>« Vous allez adorer. La transparence ici— » Elle toucha sa poitrine. « Change la vie. »</p>
<p>La mâchoire de Mia se serra. Elle scia son pain, ne répondit pas.</p>
<p>Kyle enregistra la formulation de la femme. <em>La transparence ici.</em> Pas <em>la transparence radicale.</em> Abrégé. Connaissance supposée.</p>
<p>Sténographie de vocabulaire sectaire.</p>
<p>Paula resta debout en tête de table, les regardant manger.</p>
<p>Les mains de Paula se levèrent, paumes vers l'avant. La salle se figea.</p>
<p>« Avant de partager ce repas, ancrons-nous dans le moment présent. »</p>
<p>Sa voix flottait, chaque mot délibérément espacé. Thérapeutiquement modulé. Kyle reconnut la cadence—coachs de bien-être d'entreprise, applications de méditation guidée, TED Talks sur la pleine conscience. Autorité déguisée en suggestion douce.</p>
<p>« Fermez les yeux. Sentez le soutien de la terre sous vous. »</p>
<p>Autour des tables, les paupières s'abaissèrent. Les épaules de l'homme aux yeux creux tombèrent. L'un des couples oscilla légèrement, synchronisé.</p>
<p>Kyle garda les yeux ouverts.</p>
<p>Le regard de Paula balaya la pièce, atterrissant brièvement sur lui avant de passer. Pas de reconnaissance. Pas de correction.</p>
<p>« Inspirez ce qui vous sert. Expirez ce qui ne le fait plus. »</p>
<p>Eline était assise immobile, yeux fermés, mais ses doigts tambourinèrent une fois contre le bord de la table. Trois coups.</p>
<p>Pas détendue. En train de cataloguer.</p>
<p>« Quand vous ouvrirez les yeux, vous verrez clairement. Vous parlerez avec vérité. Vous ne retiendrez rien de ce cercle de confiance. »</p>
<p>Les mots se déposèrent comme des sédiments.</p>
<p>« Ouvrez. »</p>
<p>Les paupières se levèrent. La femme plus âgée à côté de Mia expira avec un soulagement visible, comme si quelque chose de lourd avait été retiré.</p>
<p>Paula fit signe à un jeune homme près de la cuisine. Il émergea portant une pile de papier couleur crème, descendant les tables, distribuant une feuille par personne.</p>
<p>Kyle accepta la sienne. Papier recyclé, texture rugueuse. Un emploi du temps imprimé :</p>
<p><strong>Pratique du Matin (6:00) – Prairie du Mât de Mai</strong></p>
<p><strong>Petit-déjeuner Communal (8:00) – Maison Longue</strong></p>
<p><strong>Atelier Bien-être (10:00) – Grange Atelier</strong></p>
<p><strong>Repas de Midi (13:00) – Maison Longue</strong></p>
<p><strong>Période de Réflexion (15:00) – Individuel</strong></p>
<p><strong>Cercle du Soir (18:00) – Maison Longue</strong></p>
<p><strong>Souper Communal (20:00) – Maison Longue</strong></p>
<p>En bas, en plus petits caractères :</p>
<p><em>Vous devez amener votre être entier dans cet espace , pas seulement les parties que vous trouvez acceptables.</em></p>
<p>Les yeux de Kyle accrochèrent sur la virgule.</p>
<p>Rembobinage.</p>
<p><em>...dans cet espace , pas seulement...</em></p>
<p>Un espace avant la virgule.</p>
<p>Minuscule. Presque imperceptible. Le genre d'erreur que la correction automatique ne signalerait pas parce que techniquement la virgule existait. Juste mal placée d'un seul caractère.</p>
<p>Il avait déjà vu ce bug. Dans des dépôts de code où les développeurs copiaient du texte de PDF et l'espacement se corrompait. Dans des emails de locuteurs non natifs dont les claviers inséraient des espaces fantômes.</p>
<p>Une fois, peut-être une coïncidence.</p>
<p>Mais l'affect entier de Paula—son anglais impeccable, sa diction thérapeutique—ne s'alignait pas avec une ponctuation bâclée.</p>
<p>Kyle garda son visage neutre. plia le papier une fois, le posa à côté de son assiette.</p>
<p>De l'autre côté de la table, Eline scannait sa copie, puis la posa sans commentaire.</p>
<p>Paula joignit les mains. « Cette semaine, vous découvrirez ce que l'honnêteté signifie vraiment. Pas l'honnêteté de la politesse, mais l'honnêteté de l'exposition. Nous ne cachons rien ici. »</p>
<p>La femme plus âgée hocha la tête avec ferveur.</p>
<p>Les jointures de Mia blanchirent autour de sa cuillère.</p>
<p>« Mangez. Nourrissez-vous. Ce soir, nous commençons. »</p>
<p>La conversation reprit—feutrée, prudente. Kyle souleva sa cuillère à soupe, mais son attention resta sur le document à côté de son assiette.</p>
<p><em>...cet espace ,</em></p>
<p>Enregistré.</p>
<p>La lumière de l'après-midi pesait comme du verre. Pas de nuages. Pas d'ombres. Juste l'exposition implacable du Soleil de Minuit, transformant chaque brin d'herbe en une épingle de luminosité.</p>
<p>Kyle était assis sur les marches du chalet, journal en cuir ouvert mais intact. Eline avait disparu dans la Grange Atelier pour la session de bien-être. Mia avait prétexté l'épuisement et s'était retirée dans son lit. Bobi mélangeait des cartes au bord de la prairie, faisant des tours pour personne.</p>
<p>Le chant des oiseaux tournait en boucle. Mêmes trois notes. Sans fin.</p>
<p>Mouvement à la lisière des arbres.</p>
<p>La tête de Kyle se leva.</p>
<p>Une silhouette émergea du chemin forestier, là où la route non pavée disparaissait dans l'obscurité verte. Marchant lentement. Pas incertains.</p>
<p>Elle portait un simple sac en toile, les bretelles coupant dans son épaule. Des cheveux sombres pendaient, lâches, mal peignés, encadrant un visage pâle. Le lin blanc qu'elle portait semblait emprunté—trop grand, le tissu s'amassant à sa taille, les manches avalant ses mains.</p>
<p>Pas comme les autres invités, dont les uniformes allaient avec une simplicité intentionnelle.</p>
<p>Cela ressemblait à une noyade.</p>
<p>Elle s'arrêta au bord de la prairie, scannant les chalets avec des yeux écarquillés. Perdue.</p>
<p>Saga apparut de la Maison Longue, traversant l'herbe avec une efficacité rodée.</p>
<p>« Vous y êtes arrivée. »</p>
<p>Les épaules de la femme tombèrent. « Oui. Je—oui. »</p>
<p>Sa voix portait un accent que Kyle ne put placer immédiatement. Europe de l'Est, peut-être. Consonnes douces.</p>
<p>« Les directions étaient correctes ? »</p>
<p>« J'ai marché depuis l'arrêt de bus. Vingt minutes, peut-être. » Elle déplaça le poids du sac. « Je suis désolée d'être en retard. La correspondance était— »</p>
<p>« Vous êtes ici maintenant. » Le sourire de Saga était automatique. Chaleur professionnelle. « Laissez-moi vous montrer votre chalet. »</p>
<p>La femme jeta un coup d'œil vers le chalet du groupe de Kyle, puis détourna le regard. « Je ne veux pas déranger. S'il n'y a pas de place— »</p>
<p>« Il y a toujours de la place. » Saga fit un geste vers les trois chalets près de la lisière des arbres. Le bord ouest. Le plus loin de la Maison Longue. « Vous aurez de l'intimité pour vous installer. »</p>
<p>Intimité.</p>
<p>Le mot sonna creux dans un endroit qui l'éliminait partout ailleurs.</p>
<p>La femme hocha la tête, agrippant son sac plus fort. « Merci. »</p>
<p>Alors qu'elles passaient devant la position de Kyle sur les marches, Saga offrit une introduction par courtoisie. « Kyle, voici Aya. Ajout de dernière minute à la semaine. »</p>
<p>Aya croisa ses yeux une demi-seconde. Puis regarda en bas.</p>
<p>« Bonjour. »</p>
<p>Kyle inclina la tête. Ne dit rien.</p>
<p>Saga la mena vers les chalets ouest. La démarche d'Aya était hésitante, comme si chaque pas nécessitait une permission.</p>
<p>Bobi avait arrêté de mélanger. Regardant.</p>
<p>« Nouvelle invitée ? »</p>
<p>Kyle ferma son journal. « Apparemment. »</p>
<p>« Un peu tard, non ? On est ici depuis ce matin. »</p>
<p>« Ajout de dernière minute. »</p>
<p>« Amie d'un ami, probablement. » Bobi reprit son mélange, mais son attention resta sur les deux silhouettes disparaissant entre les chalets. « Elle a l'air d'en avoir bavé. »</p>
<p>Kyle ne répondit pas.</p>
<p>Mais il regarda jusqu'à ce qu'Aya et Saga s'évanouissent de la vue. Les chalets ouest. Trois d'entre eux. Adjacents. Les plus proches de la lisière des arbres, où la forêt pressait comme un souffle retenu.</p>
<p>Il rouvrit son journal.</p>
<p><em>Jour 1, 15:47. Nouvelle arrivée—Aya. Occupante unique, groupe de chalets ouest. Pas de préavis.</em></p>
<p>Son stylo plana.</p>
<p><em>Venue seule. À pied.</em></p>
<p>Il souligna les deux derniers mots.</p>
<p>Puis ferma le journal avant que Bobi ne puisse voir.</p>
<p>Le dîner la ramena dans la visibilité.</p>
<p>La Maison Longue se remplit du cliquetis des assiettes et des conversations murmurées. Les serveurs se déplaçaient entre les tables portant des plats de légumes rôtis et de pain noir. La lumière dorée ruisselait par les hautes fenêtres, lavant tout dans cette même luminosité implacable.</p>
<p>Aya entra la dernière.</p>
<p>Elle plana au seuil, scannant les tables comme si elle cherchait la permission d'exister dans l'espace. Son lin blanc pendait encore plus lâchement maintenant, manches remontées pour révéler des poignets fins. Cheveux toujours lâches—pas de couronne de fleurs comme les autres portaient.</p>
<p>Une facilitatrice plus âgée—pas Paula, quelqu'un de nouveau—la remarqua immédiatement.</p>
<p>« Entrez, entrez. » La femme se leva de son siège à la table éloignée, bras grands ouverts. « Vous devez être Aya. Saga nous a dit. »</p>
<p>Les épaules d'Aya se voûtèrent davantage vers l'intérieur. « Je ne veux pas interrompre— »</p>
<p>« Interrompre ? » La facilitatrice rit, chaleureuse et maternelle. « Il n'y a pas d'interruptions ici. Seulement des arrivées. » Elle traversa la pièce, prenant les mains d'Aya dans les siennes. « Je suis Ingrid. Bienvenue dans notre cercle. »</p>
<p>Aya hocha la tête, yeux baissés. « Merci. »</p>
<p>« Avez-vous mangé ? »</p>
<p>« Je n'ai pas faim. »</p>
<p>« Venez quand même. Asseyez-vous avec nous. » Ingrid la guida vers une chaise vide près de la table du milieu, où plusieurs invités en lin blanc firent de la place sans qu'on leur demande. « Nous ne demandons à personne d'être seul ici. »</p>
<p>Aya bougeait comme quelqu'un s'excusant de respirer. Elle prit le siège offert, se pliant petit. Mains sur ses genoux. Yeux sur la table.</p>
<p>Une autre facilitatrice, plus jeune avec des cheveux tressés, lui apporta une assiette quand même. La posa doucement.</p>
<p>« Au cas où vous changeriez d'avis. »</p>
<p>Aya chuchota quelque chose qui aurait pu être de la gratitude.</p>
<p>La femme à côté d'elle—une des habituées de la retraite que Kyle avait notée plus tôt—toucha l'épaule d'Aya légèrement. « Première fois à Hårga ? »</p>
<p>« Oui. »</p>
<p>« Ça semble écrasant au début. Toute cette ouverture. » Elle sourit. « Mais vous verrez. Quand vous arrêtez de vous protéger des gens, tout change. »</p>
<p>La voix d'Aya tomba plus bas. « Je l'espère. »</p>
<p>À travers la pièce, Kyle était assis au bout de sa table, fourchette immobile dans sa main. Regardant.</p>
<p>Eline se pencha plus près, bougeant à peine les lèvres. « Quoi ? »</p>
<p>Il ne répondit pas immédiatement. Traqua juste la posture voûtée d'Aya, la façon dont elle se rendait invisible malgré le fait d'être assise au centre de la pièce.</p>
<p>« Rien. »</p>
<p>Mais sa mâchoire se serra.</p>
<p>Quelque chose dans la performance semblait répété. La façon dont elle s'excusait d'exister. Le timing de son incertitude.</p>
<p>Il posa sa fourchette.</p>
<p>Ingrid parlait maintenant, la voix portant à travers le hall. « Ce soir nous célébrons les nouveaux départs. L'arrivée d'Aya nous rappelle—il n'est jamais trop tard pour choisir la vulnérabilité. »</p>
<p>Autour de la pièce, des têtes hochèrent. L'accord ondulant à travers les tables.</p>
<p>Aya ne leva pas les yeux de son assiette intacte.</p>
<p>Le dîner communal s'étira passé neuf heures, bien que la lumière ne changeât jamais. Même assaut doré à travers les fenêtres. Même exposition sans ombre.</p>
<p>Klaudia mangeait mécaniquement, traquant les mouvements.</p>
<p>Aya restait à la table du milieu, tête courbée sur son assiette intacte tandis qu'Ingrid et les autres la tissaient dans leur cercle avec une gentillesse rodée. L'arrivée tardive. L'ajout de dernière minute. Celle qui s'est montrée seule.</p>
<p>Trop pratique.</p>
<p>Klaudia posa sa fourchette, regardant Aya tressaillir quand quelqu'un lui offrit du pain. La performance était bonne—les épaules voûtées, la voix d'excuse, le refus de prendre de la place. Mais le timing comptait plus que la présentation.</p>
<p>Elle croisa le regard de Kyle à travers la table. Il regardait aussi, mâchoire serrée, cette immobilité analytique qu'il portait quand quelque chose ne collait pas.</p>
<p>Klaudia se leva. « Je vais vérifier la météo. »</p>
<p>Mia ne leva pas les yeux de son assiette. Julia haussa un sourcil mais ne dit rien. Le regard d'Eline suivit Klaudia jusqu'à la porte.</p>
<p>Dehors, l'air pesait épais et chaud malgré l'heure. Pas d'obscurité pour se cacher. Juste un jour sans fin saignant à travers la prairie, les arbres, les trois chalets ouest groupés près de la lisière.</p>
<p>Le chalet d'Aya. L'un d'eux, en tout cas.</p>
<p>Klaudia marcha vers le bâtiment administratif—une structure plus petite à côté de la Maison Longue avec un panneau peint à la main lisant CHALET DU PERSONNEL. Elle l'avait noté plus tôt pendant le tour de Saga, classé sous potentiellement utile.</p>
<p>La porte tenait ouverte avec une pierre de rivière.</p>
<p>À l'intérieur, des papiers couvraient un bureau. Des horaires épinglés au panneau de liège. Un ordinateur portable dormant à côté d'une tasse de thé froid. Et là—la boîte en bois contenant leurs téléphones, assise sur une étagère au-dessus du classeur.</p>
<p>Klaudia récupéra le sien, le réveilla du pouce. Pas de réseau, comme prévu aussi loin au nord. Mais elle n'avait pas besoin de réseau.</p>
<p>Elle bougea vers le bureau.</p>
<p>Le registre des invités reposait ouvert, un grand livre physique avec des colonnes pour noms, dates, affectations de chambres. Saga l'avait rempli quand ils étaient arrivés—Klaudia l'avait regardée entrer la réservation de Kyle, le stylo grattant sur la page couleur crème.</p>
<p>Elle feuilleta en arrière à travers les entrées. Dix-neuf juin, leur date d'arrivée. Sept noms dans l'écriture soignée de Saga.</p>
<p>Puis elle alla plus loin en arrière.</p>
<p>Vingt-trois avril.</p>
<p>Trois entrées. Même date, même écriture soignée :</p>
<p><em>Aya Sultanovna — Chalet 8 — Payé intégralement</em></p>
<p><em>Paula Wojcik — Chalet 9 — Payé intégralement</em></p>
<p><em>Dawid Kowalski — Chalet 10 — Payé intégralement</em></p>
<p>Le pouls de Klaudia cogna plus fort.</p>
<p>Il y a deux mois. Avant que Kyle ait même finalisé les plans de leur groupe. Avant qu'il ait envoyé l'email de confirmation à tout le monde.</p>
<p>Elle sortit son téléphone, photographia la page. La date. Les noms. Les numéros de chambre—tous les trois chalets au bord ouest, ceux séparés du groupe principal.</p>
<p>Son pouce plana sur l'écran.</p>
<p>Une carte de crédit. Devait être. Elle feuilleta vers l'avant, vérifiant les dossiers de paiement clipsés au dos du registre. Trouva les reçus d'avril.</p>
<p>Même carte. Banque kazakhe. Même horodatage de transaction pour les trois réservations—23:47 GMT.</p>
<p>Une personne. Trois chambres. Deux mois de délai.</p>
<p>Klaudia photographia ça aussi.</p>
<p>Des pas crissèrent sur le gravier dehors.</p>
<p>Elle fourra le registre en position, glissa son téléphone dans sa poche, et se tourna vers la porte juste comme Saga apparaissait sur le seuil.</p>
<p>« Oh. » Saga cligna des yeux, surprise mais pas soupçonneuse. « Vous aviez besoin de quelque chose ? »</p>
<p>Klaudia fit un geste vers la boîte verrouillée. « Vérification météo. Pensé voir si les prévisions avaient changé. »</p>
<p>« Pas de service ici, j'ai peur. »</p>
<p>« C'est vrai. Oublié. » Klaudia fit semblant de remettre son téléphone dans la boîte. « Le pont est toujours dégagé ? »</p>
<p>« Pour l'instant. Mais la pluie arrive demain. Pourrait être forte. »</p>
<p>Klaudia hocha la tête, passant devant elle dans l'épaisse soirée dorée. « Bon à savoir. »</p>
<p>Elle marcha de retour vers la Maison Longue, le cœur martelant contre ses côtes. Força sa foulée à rester décontractée. Bottes fonctionnelles silencieuses sur le chemin de terre.</p>
<p>Dans sa poche, le téléphone semblait être une preuve.</p>
<p>Deux mois. Trois chambres. Une carte.</p>
<p>Aya ne s'était pas montrée désespérée et seule. Elle avait planifié ça. Réservé son espace avant quiconque d'entre eux ne sache qu'ils venaient.</p>
<p>Klaudia atteignit la porte de la Maison Longue, pausa avec sa main sur le cadre.</p>
<p>À travers la prairie, à peine visible par la fenêtre, Aya était toujours assise voûtée à la table du milieu. S'excusant toujours de respirer.</p>
<p>Mentant toujours.</p>
<p>Kyle était assis au bout de la table, journal ouvert sur ses genoux sous la ligne de mire des autres dîneurs. Son stylo bougeait en traits soignés tandis que les fourchettes raclaient contre les assiettes et les conversations murmuraient à travers l'acoustique oppressive du hall.</p>
<p>Le document gisait à côté de son verre d'eau. L'horaire du matin de Paula, imprimé sur du papier couleur crème qui attrapait le Soleil de Minuit et le rendait maladif.</p>
<p>Il l'avait plié une fois pour tenir dans sa poche, puis déplié pour étudier le texte à nouveau.</p>
<p><em>Pratique de Bien-être Matinale commence à 6:00 dans la Prairie du Mât de Mai , météo permettant.</em></p>
<p>Là. L'espace avant la virgule. Assis comme une empreinte digitale dans un formatage autrement propre.</p>
<p>Kyle écrivit dans son journal, le stylo grattant plus fort qu'il ne l'avait prévu :</p>
<p><em>Document Paula — erreur espace-avant-virgule dans le pied de page. Incohérent avec présentation professionnelle. Suggère soit : (1) Conventions de formatage non natives, ou (2) Corruption de modèle depuis document source.</em></p>
<p>Il pausa, stylo planant.</p>
<p>GlowGlitch avait signalé des erreurs similaires il y a dix-huit mois. Un rapport utilisateur soumis via leur portail de feedback—détaillé, articulé, formaté comme une documentation QA professionnelle. Sauf enterré dans le troisième paragraphe, le même glitch. Espace avant chaque virgule dans un bloc de texte de douze lignes, puis formatage propre pour le reste.</p>
<p>Kyle l'avait rejeté comme un artefact de copier-coller d'un éditeur de texte mal configuré. Mais le rapport avait été assez complet pour qu'il le sauvegarde dans son dossier de notes forensiques. Mémoire musculaire d'années de débogage : cataloguer les anomalies même quand elles semblent non pertinentes.</p>
<p>Il ne pouvait pas accéder à ces fichiers maintenant. Pas d'ordinateur portable. Pas de téléphone. Juste la mémoire et la certitude croissante qu'il avait vu cette erreur spécifique avant.</p>
<p>Son stylo bougea encore :</p>
<p><em>Référence croisée : Modèle similaire observé dans documentation utilisateur approx. 18 mois avant. Source inconnue. Peut indiquer paternité partagée ou flux de travail.</em></p>
<p>À travers le hall, Paula se déplaçait entre les tables, touchant des épaules et murmurant des affirmations. Son chignon blond attrapait la lumière. Des lunettes de lecture perchées sur son nez, altérant la géométrie de son visage en quelque chose de presque familier mais pas tout à fait placeable.</p>
<p>Kyle étudia ses mains. La façon dont elle se tenait. La cadence répétée de sa préoccupation.</p>
<p>Rien de concret. Juste l'espace avant la virgule et le sentiment que quelqu'un qui présentait si soigneusement ne ferait pas d'erreurs de formatage amateurs.</p>
<p>À moins que l'erreur ne soit pas la sienne.</p>
<p>Il tourna une page fraîche, la data : <em>19 Juin — Soir</em>. Dessina une grille simple avec deux colonnes.</p>
<p>Colonne de gauche : <em>PAULA</em>.</p>
<p>Colonne de droite : <em>ANOMALIES</em>.</p>
<p>Sous anomalies, il écrivit :</p>
<p><em>1. Espace-avant-virgule (texte pied de page)</em></p>
<p><em>2. Papier couleur crème (correspond esthétique commune)</em></p>
<p><em>3. Phrasé impérial (« Vous devez réfléchir »)</em></p>
<p>Puis il ajouta une troisième colonne : <em>SOURCE ?</em></p>
<p>Le stylo plana encore.</p>
<p>Il jeta un coup d'œil vers la table d'Aya. Elle avait finalement accepté du pain d'Ingrid, le déchirant en petits morceaux qu'elle ne mangeait pas. Son lin blanc pendait lâche sur son cadre. Des cheveux sombres tombaient en avant, cachant son visage.</p>
<p>Kyle regarda de retour son journal.</p>
<p>Pas de connexion encore. Juste deux points de données flottant sur des orbites séparées : l'erreur de formatage de Paula et l'arrivée pratique d'Aya.</p>
<p>Mais les points de données ne restaient pas séparés. Pas si vous les traquiez assez longtemps.</p>
<p>Il ferma le journal, le glissa dans sa poche à côté du document plié. À travers la table, Eline le regardait avec cette immobilité clinique qu'elle portait quand elle cataloguait un comportement.</p>
<p>Kyle croisa son regard. Le tint trois secondes.</p>
<p>Elle comprenait. Quelque chose clochait avec le formatage. Quelque chose clochait avec le timing.</p>
<p>Quelque chose ici ne compilait pas.</p>`;

    // --- Insertion Logic ---

    // Find line index for Chapter 3
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes('"chapter": 3')) {
            chapterIndex = i;
        }
        if (chapterIndex > -1 && i > chapterIndex && lines[i].includes('"title_cn":')) {
            // Found insertion point
            insertionIndex = i;
            break;
        }
    }

    if (insertionIndex === -1) {
        throw new Error('Could not find insertion point for Chapter 3');
    }

    // Prepare lines to insert
    // Need to escape quotes within contentFr for JSON string
    const escapedContent = contentFr.replace(/"/g, '\\"').replace(/\n/g, ''); // Flatten newlines for JSON string?
    // Wait, in previous data.js content, newlines were used or not?
    // data.js content showed: `"content_fr": "<div class=\\"part-header-inline\\">...`
    // It seems previous chapter (Chapter 1) content was on a single line in JSON?
    // Or at least, the file `data.js` typically has content fields on single lines (or formatted).
    // Let's replace newlines with nothing if we want minified, or just keep them if valid string.
    // JSON strings cannot contain literal newlines.

    // So yes, I MUST replace real newlines with nothing (since I'm concatenating HTML strings) or space?
    // Actually, in HTML, newlines are whitespace.
    // But my `contentFr` variable has newlines between `<p>` tags.
    // I should probably remove them to be safe and keep JSON valid on one line.

    // Also, remember to escape quotes!

    const jsonSafeContent = escapedContent;

    const insertLines = [
        `        "title_fr": "${titleFr}",`,
        `        "content_fr": "${jsonSafeContent}",`
    ];

    lines.splice(insertionIndex + 1, 0, ...insertLines);

    fs.writeFileSync(filePath, lines.join('\n'));
    console.log('Successfully added French translation for Chapter 3');

} catch (err) {
    console.error('Error updating file:', err);
    process.exit(1);
}
