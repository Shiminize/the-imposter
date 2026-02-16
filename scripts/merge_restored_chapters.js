const fs = require('fs');
const path = require('path');

const cnPath = path.join(__dirname, '../Content/THE_IMPOSTER/cn.md');
const taskPath = path.join(__dirname, '../.gemini/antigravity/brain/3490c31f-ef3f-4d6f-a050-bb9c18e30119/task.md');

console.log('Reading cn.md...');
const cnContent = fs.readFileSync(cnPath, 'utf8').split('\n');

// Defined split points based on grep analysis
// 715: ## Chapter 3: The Weaving -> Index 714
// 1872: ## Chapter 10: The Porcelain Break -> Index 1871
const cutStart = 714;
const cutEnd = 1871;

console.log(`Extracting Ch 1-2 (Lines 1-${cutStart})...`);
const part1 = cnContent.slice(0, cutStart).join('\n');

console.log(`Extracting Ch 10-18 (Lines ${cutEnd + 1}-${cnContent.length})...`);
const part3 = cnContent.slice(cutEnd).join('\n');

let part2 = '';
const restoredChapters = [];

for (let i = 3; i <= 9; i++) {
    const tempFileName = `temp_ch${i}_restore.md`;
    const tempFilePath = path.join(__dirname, `../${tempFileName}`);

    if (fs.existsSync(tempFilePath)) {
        console.log(`Reading ${tempFileName}...`);
        const chContent = fs.readFileSync(tempFilePath, 'utf8');
        part2 += chContent + '\n\n';
        restoredChapters.push(i);
    } else {
        console.warn(`WARNING: ${tempFileName} not found! Skipping Chapter ${i}.`);
    }
}

const finalContent = part1.trim() + '\n\n' + part2.trim() + '\n\n' + part3.trim();

console.log('Writing merged content to cn.md...');
fs.writeFileSync(cnPath, finalContent);

console.log('Merge complete.');
console.log(`Restored Chapters: ${restoredChapters.join(', ')}`);
