const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/features/reader/data.js');

try {
    let content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');
    let fixedCount = 0;

    const fixedLines = lines.map(line => {
        if (line.trim().startsWith('"content_fr":')) {
            let original = line;

            // Replace literal double backslash quote \\" with literal backslash quote \"
            // Regex for \\" is /\\\\"/g ? No.
            // String.replaceAll('\\\\"', '\\"') should work.
            // Wait.
            // \\\\ means \\ (literal backslash escaped).
            // " mean " (literal quote).
            // So \\\\" matches literal \\ then ".
            // Replacement: \\"
            // Wait. \\ escape \. So literal \ then ".
            // So replace \\" with \"

            let fixed = line.replaceAll('\\\\"', '\\"');

            if (original !== fixed) {
                fixedCount++;
                console.log('Fixed double escaped quotes');
            }
            return fixed;
        }
        return line;
    });

    if (fixedCount > 0) {
        fs.writeFileSync(filePath, fixedLines.join('\n'));
        console.log(`Successfully fixed ${fixedCount} line(s) in data.js`);
    } else {
        console.log('No lines needed fixing.');
    }

} catch (err) {
    console.error('Error fixing file:', err);
    process.exit(1);
}
