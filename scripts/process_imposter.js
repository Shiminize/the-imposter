const fs = require('fs');
const path = require('path');

const inputPath = path.join(__dirname, '../Content/THE_IMPOSTER/2026-02-16 04-36-42 the-resort-the-imposter.md');
const outputPath = path.join(__dirname, '../src/features/reader/data.js');

if (!fs.existsSync(inputPath)) {
    console.error('Input file not found locally:', inputPath);
    process.exit(1);
}

const rawContent = fs.readFileSync(inputPath, 'utf8');
const lines = rawContent.split('\n');

let cleanedLines = [];
let currentChapter = 0;
let capture = false;
let chapterBuffer = [];
let chapters = [];

// Regex to identify chapter starts
// Matches: "### Chapter 1: Title" or "#### Chapter 1"
const chapterRegex = /^(?:#+)\s*Chapter\s*(\d+)(?::\s*(.*))?$/i;

// Regex to identify unwanted headers
// Matches: "#### Chapter 1 - Scene 2" or "#### ... (continued)"
const unwantedHeaderRegex = /^(?:#+)\s*Chapter\s*\d+.*Scene\s*\d+/i;
const continuedRegex = /\(continued\)/i;
const sceneBreakRegex = /^\s*\*\s*\*\s*\*\s*$/;

// Tana French style replacements (Global)
// We are being conservative here to avoid breaking character voice.
// Replacing obvious low-quality functional headers or meta-text.
const replacers = [
    { from: /In the previous chapter/gi, to: "Previously" }, // Meta-narrative breach
];

console.log(`Processing ${lines.length} lines...`);

for (let i = 0; i < lines.length; i++) {
    let line = lines[i];

    // 1. Skip unwanted headers
    if (unwantedHeaderRegex.test(line)) {
        console.log(`Skipping unwanted header line ${i + 1}: ${line}`);
        continue;
    }
    if (continuedRegex.test(line) && (line.trim().startsWith('#') || line.trim().length < 50)) {
        console.log(`Skipping continued marker line ${i + 1}: ${line}`);
        continue;
    }

    // 2. Handle Scene Breaks
    if (sceneBreakRegex.test(line) || line.trim() === '####') {
        cleanedLines.push('<hr class="scene-break">');
        continue;
    }

    // 3. Apply Style Replacements
    replacers.forEach(rep => {
        line = line.replace(rep.from, rep.to);
    });

    // 4. Chapter Detection
    const invalidHeaderMatch = line.match(/^#+\s+/); // Detect any markdown header
    const chapterMatch = line.match(chapterRegex);

    if (chapterMatch) {
        // If we have collected content for a previous chapter, save it
        const hasContent = chapterBuffer.some(line => line.trim().length > 0);

        if (currentChapter > 0 && hasContent) {
            chapters.push({
                chapter: currentChapter,
                title: currentChapterTitle,
                content: formatBody(chapterBuffer)
            });
            chapterBuffer = [];
        }

        // Start new chapter
        const newChapterNum = parseInt(chapterMatch[1], 10);

        // Check for duplicate header for same chapter (e.g. "Chapter 11", then "Chapter 11: Title")
        // If we haven't accumulated content yet, just update the title.
        if (newChapterNum === currentChapter && !hasContent) {
            if (chapterMatch[2]) {
                currentChapterTitle = chapterMatch[2].trim();
                console.log(`Updated title for Chapter ${currentChapter}: ${currentChapterTitle}`);
            }
        } else {
            currentChapter = newChapterNum;
            currentChapterTitle = chapterMatch[2] ? chapterMatch[2].trim() : `Chapter ${currentChapter}`;
            console.log(`Found Chapter ${currentChapter}: ${currentChapterTitle}`);
        }

        continue; // Skip the header line itself in the content
    }

    // If it's another header (like Part I, or some sub-header not caught), we might want to keep it or skip it.
    // The source text has "## I — THE GATHERING" which are Act markers, but we want to structure them manually in the data structure, 
    // or include them as text. The user wants specific ACT structure in the logic, so we might strip these text headers to strictly control the UI.
    if (invalidHeaderMatch && !chapterMatch) {
        // E.g. "## I — THE GATHERING"
        // Let's iterate and see what they are.
        if (line.toLowerCase().includes('the gathering') || line.toLowerCase().includes('the unraveling') || line.toLowerCase().includes('the reckoning')) {
            console.log(`Skipping Part header line ${i + 1}: ${line}`);
            continue; // Skip, we will add Part info in the data structure
        }
    }

    // 5. Accumulate Content
    // Only start accumulating after Chapter 1 starts
    if (currentChapter > 0) {
        chapterBuffer.push(line);
    }
}

// Push the last chapter
if (chapterBuffer.some(line => line.trim().length > 0) && currentChapter > 0) {
    chapters.push({
        chapter: currentChapter,
        title: currentChapterTitle,
        content: formatBody(chapterBuffer)
    });
}

function formatBody(lines) {
    // Join lines, split by double newlines for paragraphs
    return lines.join('\n')
        .split(/\n\s*\n/) // Split by empty lines
        .map(p => {
            let trimmed = p.trim();
            if (!trimmed) return '';
            if (trimmed === '<hr class="scene-break">') return trimmed;
            if (trimmed.startsWith('<div class="part-header')) return trimmed; // Don't wrap headers

            // Clean up email blockquote markers
            if (trimmed.startsWith('>')) {
                // Remove the > markers and extra whitespace
                trimmed = trimmed.replace(/^>\s*/gm, '').trim();
                // Optionally wrap in blockquote if it's clearly a quote, but for now just clean text per user request "symbols shouldn't exist"
                // or maybe we should use <blockquote>? The user said "should not exist", implying the artifacts are ugly.
                // Let's wrap in a styled span or just clean it. Given usage context (email), let's just strip the > char.
                // Actually, let's keep it simple: formatting is good, raw chars are bad.
            }

            // Parse Markdown Inline Styles
            trimmed = parseMarkdown(trimmed);

            return `<p>${trimmed.replace(/\n/g, ' ')}</p>`;
        })
        .filter(p => p)
        .join('\n');
}

function parseMarkdown(text) {
    // Note: Basic parsing. Order matters.

    // Bold: **text**
    text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    // Italics: *text* (and handle nested? no, simple regex)
    text = text.replace(/\*([^\*]+)\*/g, '<em>$1</em>');

    // Remove any remaining loose > if they were at start of lines but we processed block above?
    // The splitting by \n\n means paragraphs. 
    // If a paragraph handled newlines inside it (by .replace(/\n/g, ' ')), we might have > inside.
    // Let's strip > that appear at start of what was a line.
    text = text.replace(/(&gt;|>)\s*/g, '');

    return text;
}

// Construct final data structure with Acts
const finalStructure = [
    {
        chapter: 0,
        title: "COVER",
        title_cn: "The Imposter",
        content: `<img src="src/assets/images/cover.png" class="cover-img" alt="The Imposter">`,
        content_cn: `<img src="src/assets/images/cover.png" class="cover-img" alt="The Imposter">`
    }
];

// Act I: 1-6
// Act II: 7-12
// Act III: 13-18

// We can inject "PART X" divider chapters or just groupings.
// The reader engine usually just takes a flat list of chapters.
// The user request "Structure: ... Part I (Chapters 1-6)" implies we might need separator entries? 
// Or just let the chapters flow. 
// "Part I: THE GATHERING" being a title content entry vs a wrapper.
// Comparing with data.sample.js:
/*
    {
        chapter: 1,
        title: "PART I: THE BEGINNING",  <-- This suggests the Part title is part of the chapter title?
        ...
    }
*/
// But existing reader usually has Chapter 1, Chapter 2.
// Let's assume we want to insert Title Cards for the Acts?
// Or just rename Chapter 1 to "ACT I - Chapter 1"? 
// The implementation plan said:
//   - `Part I: THE GATHERING` (Chapters 1-6).
// This implies a grouping. 
// I will insert "Part" Title Cards before the first chapter of each act.

const acts = [
    { start: 1, title: "PART I: THE GATHERING" },
    { start: 7, title: "PART II: THE UNRAVELING" },
    { start: 13, title: "PART III: THE RECKONING" }
];

// Sort chapters just in case
chapters.sort((a, b) => a.chapter - b.chapter);

let outputChapters = [...finalStructure];

// Redundant loop removed

// Re-build outputChapters from scratch to ensure correct order and no duplicates
outputChapters = [...finalStructure];

chapters.forEach(ch => {
    // Check if this chapter is the start of an Act
    const act = acts.find(a => a.start === ch.chapter);
    let finalContent = ch.content;

    if (act) {
        const partHeader = `<div class="part-header-inline"><h3>${act.title}</h3><hr class="part-divider"></div>`;
        finalContent = partHeader + finalContent;
    }

    outputChapters.push({
        chapter: ch.chapter,
        title: `Chapter ${ch.chapter}: ${ch.title}`,
        title_cn: `Chapter ${ch.chapter}: ${ch.title}`,
        content: finalContent,
        content_cn: finalContent
    });
});

const fileContent = `// book.js - Generated Content for The Imposter
PocketReader.bookContent = ${JSON.stringify(outputChapters, null, 4)};
`;

fs.writeFileSync(outputPath, fileContent);
console.log(`Generated data.js with ${outputChapters.length} entries.`);
