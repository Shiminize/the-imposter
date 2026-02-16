const fs = require('fs');
const path = require('path');

const cnPath = path.join(__dirname, '../Content/THE_IMPOSTER/cn.md');
const content = fs.readFileSync(cnPath, 'utf8');
const lines = content.split('\n');

// Defined split points
const ch3Start = 713; // Line 714 starts with ## Chapter 3
const ch10Start = 1199; // Line 1200 starts with ## Chapter 10
const appendedStart = 2015; // Line 2016 starts with #### 第三章

// Extract sections
const section1 = lines.slice(0, ch3Start); // Ch 1-2
const section2_placeholders = lines.slice(ch3Start, ch10Start); // Ch 3-9 placeholders (Discard)
const section3 = lines.slice(ch10Start, appendedStart); // Ch 10-18
const section4_full = lines.slice(appendedStart); // Ch 3-9 Full (To be formatted and inserted)

// Map for Chapter Titles
const chapterTitles = {
    3: "The Weaving",
    4: "Whispers and Observations",
    5: "The Seeds of Doubt",
    6: "The Script is Read",
    7: "The Unsettling Mimicry",
    8: "The Petition (Day 5 at Hårga)",
    9: "Root Cellar Reflections (Day 6 at Hårga)"
};

// Chinese Title Map (extracted from section4_full or hardcoded if needed)
// section4 starts with #### 第三章：编织...
// I will parse section4 to split by chapter and cleanup headers.

let parsedChapters = {};
let currentCh = 0;
let buffer = [];
let chTitleCn = "";

section4_full.forEach(line => {
    const match = line.match(/^#{3,5}\s*(?:第\s*([零一二三四五六七八九十百]+|[0-9]+)\s*章)(?:[:：]\s*(.*))?/);
    if (match) {
        if (currentCh > 0) {
            parsedChapters[currentCh] = {
                title_cn: chTitleCn,
                content: buffer.join('\n')
            };
            buffer = [];
        }

        // Parse Chinese number or handle blindly?
        // My appended files used: 第三章, 第四章...
        // Simple map
        const numMap = { '三': 3, '四': 4, '五': 5, '六': 6, '七': 7, '八': 8, '九': 9 };
        currentCh = numMap[match[1]] || parseInt(match[1]);
        chTitleCn = match[0].replace(/^#+\s*/, '').trim(); // Keep the whole title line as title_cn?
        // Actually, standard format is "title_cn: Full Chinese Title"
        // And "## Chapter X: English Title"
    } else {
        if (currentCh > 0) buffer.push(line);
    }
});

// Capture last chapter
if (currentCh > 0) {
    parsedChapters[currentCh] = {
        title_cn: chTitleCn,
        content: buffer.join('\n')
    };
}

// Construct new content
let newContent = section1.join('\n') + '\n\n';

for (let i = 3; i <= 9; i++) {
    if (parsedChapters[i]) {
        const engTitle = chapterTitles[i] || `Chapter ${i}`;
        const cnTrans = parsedChapters[i];

        newContent += `## Chapter ${i}: ${engTitle}\n`;
        newContent += `title_cn: ${cnTrans.title_cn}\n\n`;
        newContent += cnTrans.content + '\n\n';
    } else {
        console.warn(`Warning: Missing full translation for Chapter ${i}`);
    }
}

newContent += section3.join('\n');

fs.writeFileSync(cnPath, newContent);
console.log('Successfully restored and reformatted cn.md');
