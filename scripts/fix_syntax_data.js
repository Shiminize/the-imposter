const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/features/reader/data.js');

try {
    let content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');
    let fixedCount = 0;

    const fixedLines = lines.map(line => {
        if (line.trim().startsWith('"content_fr":')) {
            // Find \\" and replace with \"
            // Wait, regex for literal backslash followed by quote is /\\"/ in JS string literal?
            // Actually, /\\\\"/ matches literal backslash followed by quote.
            // If the file has literal backslash followed by quote, it matches.
            // But verify:
            // "abc\\"def" -> abc\def (escaped quote)
            // But if file has TEXT `abc\\"def`.
            // The string is `abc\\"def`.
            // Regex /\\\\"/ matches `\\"` (literal backslash quote).

            // Wait, previous attempt failed because maybe the logic was slightly wrong or regex was tricky.
            // Let's use simple string replacement loop to be safe.

            let original = line;
            let fixed = line;

            // Simple loop to replace \" with " if preceded by odd number of backslashes?
            // Actually, we want to replace `\\"` (escaped backslash quote)
            // with `\"` (escaped quote).

            // Regex approach again:
            // Match literal backslash followed by quote.
            // Need to match `\` `"` but NOT `\` `\` `"`.
            // Actually, if we have `class=\\"part`, we want `class=\"part`.
            // So replace `\\"` with `\"`.

            // Wait, `\\"` means:
            // Backslash (escaped as `\\`)
            // Quote (escaped as `\"`)
            // So literal `\` `"` sequence.

            // Regex to match literal `\` `"`: `/\\"/g` ? No.
            // `/\\\\"/g` matches `\` `"`?
            // Test:
            // `console.log(/\\\\"/g.test('a\\"b'))` -> true.
            // So yes.

            // But wait, my previous script did exactly this!
            // `fixed = fixed.replace(/\\\\"/g, '\\"');`
            // Replacement string `'\\"'` is `\"`.
            // So `a\\"b` -> `a\"b`.

            // Maybe I didn't verify it worked? Or file had `\\\\"` (double backslash)?
            // If file had `class=\\"part` (literal char `\`, literal char `"`) ? No that's impossible in JSON content unless double escaped.
            // If it had `class=\\"part` (literal `\` `\` `"`), then `\\\\"` regex does NOT match.
            // Because `\\\\"` matches `\` `"`.
            // So for `\` `\` `"`, it matches the second backslash and quote?
            // `\` then `\` `"` matched (second pair).
            // Replaced with `\"`.
            // Result: `\` `\"` -> `\\"` (escaped quote).

            // So `class=\\"part` -> `class=\"part` is what we want? 
            // Wait.
            // `class=\\"part` -> `\` `\` `"`.
            // Matches `\` `"` (last 2 chars).
            // Replaced with `\"`.
            // Result: `\` `\"` -> `\\"` (escaped quote).

            // Wait.
            // `\` (literal) + `\"` (escaped quote).
            // In JS string: `\\"` implies literal backslash?
            // No. `\"` implies escaped quote.
            // `\\"` implies backslash then quote?

            // If I want `\` (literal) then `"` (literal), I write `\\"`.
            // If I want `"` (escaped), I write `\"`.

            // The ERROR is "Unexpected identifier 'part'".
            // This happens if string ends at `class="`.
            // This means `"` was NOT escaped.
            // So we have `class="part`.
            // This implies the file has `class="part`.
            // So `\"` became `"`?

            // My previous script:
            // `fixed = fixed.replace(/\\\\"/g, '\\"');`
            // Replacement `'\\"'` is `\"` (backslash quote).
            // Wait.
            // In replacement string, `\` is escape char?
            // `console.log("a".replace(/a/, '\\"'))` -> `\"`.
            // So replacement is literal `\"`.

            // So `class="part` means either:
            // 1. I replaced `\"` with `"` (unlikely).
            // 2. The file had `"` (unescaped) initially? No, Step 160 image showed successful render but ugly. So it was valid string.
            // 3. I introduced `"` by mistake.

            // Let's assume the current state is BROKEN and has `class="part`.
            // I need to escape unescaped quotes!
            // But NOT the starting/ending quotes of the string.

            // Strategy:
            // Since we know the line structure: `"content_fr": "..."`
            // We can match the value inside the outer quotes.
            // Then escape verify quotes inside.

            let start = line.indexOf('content_fr": "') + 'content_fr": "'.length;
            let end = line.lastIndexOf('"');

            if (start > -1 && end > start) {
                let content = line.substring(start, end);

                // Inspect content for unescaped quotes
                // Replace `"` with `\"` if not preceded by `\`.

                // Helper: Replace all `"` with `\"` except if already escaped.
                // Regex: `/(?<!\\)"/g` (Negative lookbehind).
                // Or simply replace `"` with `\"` and then fix double escapes `\\"` -> `\"`? No.

                // Let's try lookbehind or simple split/join.
                // Or better: manual scan.

                let newContent = '';
                for (let i = 0; i < content.length; i++) {
                    if (content[i] === '"' && (i === 0 || content[i - 1] !== '\\')) {
                        newContent += '\\"';
                    } else {
                        newContent += content[i];
                    }
                }

                // Reconstruct line
                fixed = line.substring(0, start) + newContent + line.substring(end);
            }

            if (original !== fixed) {
                fixedCount++;
                console.log('Fixed line quotes');
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
