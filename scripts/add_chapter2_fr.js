const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/features/reader/data.js');

try {
    let content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');
    let chapter2Index = -1;
    let contentIndex = -1;

    // Translation for Chapter 2
    // Title: Chapter 2: The Journey North -> Chapitre 2 : Le Voyage vers le Nord
    // Content: "The rented van smelled like synthetic pine..." -> "La camionnette de location sentait le pin synthétique..."

    // Detailed translation
    const titleFr = 'Chapitre 2 : Le Voyage vers le Nord';

    // Note: I will use a simplified reliable translation based on the "Nordic Noir" style. 
    // Focusing on atmosphere.
    // "The rented van smelled like synthetic pine and underlying mildew." -> "La camionnette de location empestait le pin synthétique et la moisissure sous-jacente."
    // "Seven hours." -> "Sept heures."

    /* 
    Chapter 2 Content (Summary of translation):
    - Van smell, atmosphere.
    - Kyle driving.
    - Stop at gas station.
    - Arrival at Hårga.
    */

    // I need to generate the FULL French content string.
    // Based on the English text I read in previous step.

    const contentFr = `<p>La camionnette de location empestait le pin synthétique et la moisissure sous-jacente. Sept heures. C'était la durée que Kyle avait allouée pour le trajet de Rotterdam aux forêts denses au nord de Stockholm, un calcul qui ne tenait pas compte des pauses toilettes humaines ou de la densité existentielle du silence qui remplissait le véhicule.</p><p>Kyle conduisait avec une efficacité de machine, ses mains à dix heures et deux heures. Il ne regardait pas ses passagers dans le rétroviseur. Il n'en avait pas besoin. Il pouvait sentir leur tension comme une chute de pression barométrique.</p><p>Mia était assise au dernier rang, ses écouteurs enfoncés comme une barricade. Elle ne jouait rien—la batterie était morte depuis le Danemark—mais le fil blanc signalait son indisponibilité. À côté d'elle, Bobi dormait la bouche ouverte, une vulnérabilité qui semblait presque obscène dans la lumière grise de l'autoroute.</p><p>Klaudia, sur le siège passager, naviguait. Pas avec Google Maps, mais avec un classeur de prévisions météorologiques imprimées et d'itinéraires topographiques.</p><p>« Pluie prévue à seize heures », dit-elle. Ce n'était pas une conversation. C'était une mise à jour de statut.</p><p>« On sera arrivés d'ici là », répondit Kyle.</p><p>Eline regardait par la fenêtre. Le paysage avait changé. La géométrie plate et ordonnée des Pays-Bas avait cédé la place à l'étendue industrielle de l'Allemagne, puis aux ponts du Danemark, et maintenant, la Suède. Des arbres. Juste des arbres interminables, interrompus seulement par des affleurements de granit et des panneaux d'avertissement pour les orignaux.</p><p>C'était beau d'une manière qui ne se souciait pas d'être vu. Indifférent. Froid.</p><p>« On devrait s'arrêter », dit Julia. Elle était coincée au milieu, ses genoux pressés contre le siège de Kyle. « J'ai besoin de café. De vrai café, pas de cette boue de station-service. »</p><p>« On s'est arrêtés il y a quatre-vingt-dix minutes », dit Kyle.</p><p>« Et maintenant on s'arrête encore. » Julia ne demanda pas. Elle énonça un fait.</p><p>Kyle vérifia l'heure. « Quinze minutes. Ça nous mettra en retard selon l'horaire d'arrivée optimal. »</p><p>« L'optimisation », marmonna Mia depuis le fond, ses écouteurs retirés juste assez pour entendre, « est la raison pour laquelle on est dans ce pétrin, Kyle. »</p><p>Il ne répondit pas, mais le clignotant cliqua : un rythme régulier et mécanique. Il prit la sortie.</p><p>La station-service surgit de la forêt comme un avant-poste sur Mars. Néon brutal contre les arbres sombres. Ils sortirent, s'étirant, leurs corps se dépliant après des heures de confinement. L'air était plus froid ici. Il avait un goût de résine et de terre humide.</p><p>Bobi se réveilla en sursaut. « On est là ? »</p><p>« On est nulle part », dit Eline. Elle sortit son carnet, nota l'heure, la température, le niveau collectif de fatigue.</p><p>Ils entrèrent en file indienne. La lumière fluorescente bourdonnait. Kyle se dirigea directement vers les boissons énergisantes, sélectionnant une marque sans sucre qu'il consommait comme du carburant plutôt que comme une boisson.</p><p>Klaudia resta près de la camionnette, vérifiant la pression des pneus. Elle ne faisait pas confiance à la maintenance de l'agence de location.</p><p>Julia et Mia se retrouvèrent près de la machine à café.</p><p>« Il a imprimé un itinéraire », chuchota Mia. « Tu as vu ? Un itinéraire pour une retraite de 'spontanéité'. »</p><p>Julia regarda le liquide noir remplir son gobelet en papier. « C'est son mécanisme d'adaptation. Il essaie de coder une solution au chaos humain. »</p><p>« C'est un sociopathe », corrigea Mia.</p><p>« C'est notre patron. Et notre ami. »</p><p>« C'était notre ami. Maintenant, il est juste... le Gestionnaire. »</p><p>Elles retournèrent à la camionnette. Kyle attendait, le moteur tournant. Il ne dit rien sur leur retard de trois minutes. Il attendit simplement que les portes coulissantes se ferment, puis il s'engagea de nouveau sur l'autoroute.</p><p>La route se rétrécit. L'asphalte céda la place au gravier. La forêt se referma autour d'eux, les arbres devenant plus grands, plus denses, bloquant le ciel de l'après-midi. Le signal GPS sur le téléphone de Kyle vacilla et mourut.</p><p>« On perd le signal », nota Bobi, la panique montant dans sa voix.</p><p>« C'est prévu », dit Kyle.</p><p>Ils passèrent sous une arche en bois. Le mot <strongHÅRGA</strong était gravé dans la poutre, les lettres sombres et dentelées.</p><p>Au-delà, les arbres s'ouvraient sur une vallée. Et là, baignée dans une lumière qui semblait trop brillante, trop dorée pour être réelle, se trouvait la retraite.</p><p>Ce n'était pas ce qu'ils attendaient. Pas de cabanes rudes. C'était un campus d'une architecture immaculée et pâle. Des dortoirs en bois blond. Un bâtiment principal avec un toit en A qui ressemblait à une cathédrale. Et partout, des gens vêtus de lin blanc, bougeant avec la lenteur délibérée de ceux qui ont oublié le concept de date limite.</p><p>Kyle gara la camionnette. Le silence, quand il coupa le moteur, était absolu.</p><p>« On est arrivés », dit-il.</p><p>Personne ne bougea. Ils regardèrent les chiffres blancs s'approcher de la camionnette. Ils souriaient. C'était le genre de sourire qui ne s'arrêtait pas aux yeux, mais qui s'étendait jusqu'aux gencives.</p><p>« Bienvenue », dit la première femme, ouvrant la porte de Kyle. « Nous vous attendions. »</p><p>Kyle sortit, son classeur à la main. « Kyle Vance. Groupe de sept. Réservation confirmée. »</p><p>La femme ne regarda pas le classeur. Elle posa une main sur son bras. Sa paume était chaude. « Pas de réservations ici, Kyle. Juste des arrivées. »</p><p>Elle regarda la camionnette, rencontrant le regard de chacun à tour de rôle. Quand ses yeux trouvèrent ceux d'Eline, le sourire s'élargit, juste une fraction.</p><p>« Laissez vos bagages », dit-elle. « Vous n'aurez pas besoin de ce que vous avez apporté. »</p><p>« Mon ordinateur portable est là-dedans », commença Kyle.</p><p>« Surtout pas de ça. »</p><p>Mia fut la dernière à sortir. Elle frissonna, bien que le soleil soit chaud. Elle regarda vers la ligne d'arbres, la route par laquelle ils étaient venus. Elle semblait déjà impossiblement loin, comme un rêve au réveil.</p><p>« Allez », dit Kyle, sa voix forte, essayant d'imposer l'ordre à ce nouveau monde. « On s'enregistre, on s'oriente, on commence la session de dix-sept heures. »</p><p>Il marcha vers le bâtiment principal.</p><p>Les autres suivirent. Ils n'avaient pas le choix. La camionnette était déjà entourée par les hôtes souriants en blanc, et la route derrière eux avait disparu dans l'ombre des arbres.</p><p>Le voyage vers le nord était terminé. La descente venait de commencer.</p>`;

    // Now insert into data.js

    // Logic: find the line with "chapter": 2
    // find the end of that object or the "content" field.
    // Insert "title_fr" and "content_fr" before "content".

    // We already know Chapter 2 structure from previous `head` call.
    // "chapter": 2,
    // "title": "Chapter 2: The Journey North",
    // "title_cn": ...

    // We will insert after "title_cn".

    // Find line index for Chapter 2
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes('"chapter": 2')) {
            chapter2Index = i;
        }
        if (chapter2Index > -1 && i > chapter2Index && lines[i].includes('"title_cn":')) {
            // Found insertion point
            contentIndex = i;
            break;
        }
    }

    if (contentIndex === -1) {
        throw new Error('Could not find insertion point for Chapter 2');
    }

    // Prepare lines to insert
    // Ensure comma on previous line if needed? 
    // "title_cn": "...", <- It has comma.

    const insertLines = [
        `        "title_fr": "${titleFr}",`,
        `        "content_fr": "${contentFr.replace(/"/g, '\\"')}",` // Escape quotes for JSON string
    ];

    // Note: contentFr has unescaped quotes in the variable definition above?
    // `<p>... "On est là ?" ...</p>`
    // The variable `contentFr` is a template literal string. It contains literal quotes.
    // When writing to JSON file, we must escape them to `\"`.
    // My fix script handles `\\"` -> `\"` translation.
    // But here I am writing `content_fr`: "..."
    // inside the file.
    // So the file content should be: ` "content_fr": "<p>... \"On est là ?\" ...</p>", `
    // So I need to replace `"` with `\"` in `contentFr`.

    // Verify escaping logic:
    // `contentFr` string in memory: `<p>... "Hello" ...</p>`
    // `.replace(/"/g, '\\"')` -> `<p>... \"Hello\" ...</p>`
    // Result line: `        "content_fr": "<p>... \"Hello\" ...</p>",`
    // File content: `... "content_fr": "<p>... \"Hello\" ...</p>", ...`
    // This is correct valid JSON string.

    lines.splice(contentIndex + 1, 0, ...insertLines);

    fs.writeFileSync(filePath, lines.join('\n'));
    console.log('Successfully added French translation for Chapter 2');

} catch (err) {
    console.error('Error updating file:', err);
    process.exit(1);
}
