const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/features/reader/data.js');

try {
    let content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');
    let fixedCount = 0;

    const fixedLines = lines.map(line => {
        if (line.trim().startsWith('"content_fr":')) {
            // Replace \\n with nothing (remove literal \n text)
            // Replace \\" with \" (fix double escaped quotes)

            // Note: We use a loop or careful regex to ensure we don't double-fix if run twice?
            // Actually, simply replacing \\n and \\" is reasonably safe if we assume the input is the double-escaped version.

            let original = line;

            // Remove \\n
            // Regex: /\\\\n/g matches literal \\n
            let fixed = line.replace(/\\\\n/g, '');

            // Fix \\" -> \"
            // Regex: /\\\\"/g matches literal \\"
            fixed = fixed.replace(/\\\\"/g, '\\"');

            if (original !== fixed) {
                fixedCount++;
                console.log('Fixed line: ' + line.substring(0, 50) + '...');
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
