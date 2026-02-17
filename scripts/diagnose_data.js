const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/features/reader/data.js');

try {
    let content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');

    lines.forEach((line, index) => {
        if (line.includes('content_fr')) {
            console.log(`Line ${index + 1}:`);
            console.log(`Length: ${line.length}`);
            console.log(`Starts with: '${line.substring(0, 50)}'`);

            // Check quoting
            let start = line.indexOf('content_fr": "');
            if (start === -1) {
                console.log('WARNING: Does not contain standard key-value pattern content_fr": "');
            } else {
                let contentStart = start + 'content_fr": "'.length;
                let suspectPart = line.substring(contentStart, contentStart + 50);
                console.log(`Content starts with: '${suspectPart}'`);

                // Check if content itself has unescaped quotes at start
                // e.g. <div class="part...
                if (suspectPart.includes('"')) {
                    let firstQuote = suspectPart.indexOf('"');
                    if (firstQuote > 0 && suspectPart[firstQuote - 1] !== '\\') {
                        console.log(`FOUND UNESCAPED QUOTE AT INDEX ${firstQuote} of content!`);
                        console.log(`Context: ...${suspectPart.substring(firstQuote - 5, firstQuote + 5)}...`);
                    } else {
                        console.log(`Quote at index ${firstQuote} seems escaped (preceded by ${suspectPart[firstQuote - 1]})`);
                    }
                }
            }
        }
    });

} catch (err) {
    console.error('Error reading file:', err);
}
