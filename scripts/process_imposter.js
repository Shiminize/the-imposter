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

// Acts with Chinese Titles
const acts = [
    { start: 1, title: "PART I: THE GATHERING", title_cn: "第一部：聚会" },
    { start: 7, title: "PART II: THE UNRAVELING", title_cn: "第二部：真相" },
    { start: 13, title: "PART III: THE RECKONING", title_cn: "第三部：清算" }
];

// --- Parse Chinese Content ---
const cnPath = path.join(__dirname, '../Content/THE_IMPOSTER/cn.md');
let cnChapters = new Map();

if (fs.existsSync(cnPath)) {
    console.log('Found Chinese translation file. Parsing...');
    const cnContent = fs.readFileSync(cnPath, 'utf8');
    const cnLines = cnContent.split('\n');
    let cnCurrentChap = 0;
    let cnBuffer = [];
    let cnTitle = "";

    cnLines.forEach(line => {
        // Detect Chapter: "## Chapter 1: ..."
        const chapMatch = line.match(/^##\s*Chapter\s*(\d+)/i);
        if (chapMatch) {
            // Save previous
            if (cnCurrentChap > 0 && cnBuffer.length > 0) {
                cnChapters.set(cnCurrentChap, {
                    title_cn: cnTitle,
                    content_cn: formatBody(cnBuffer)
                });
                cnBuffer = [];
            }
            cnCurrentChap = parseInt(chapMatch[1], 10);
            cnTitle = ""; // Reset title, look for title_cn line
        } else if (line.trim().startsWith('title_cn:')) {
            cnTitle = line.replace('title_cn:', '').trim();
        } else if (cnCurrentChap > 0) {
            cnBuffer.push(line);
        }
    });

    // Save last
    if (cnCurrentChap > 0 && cnBuffer.length > 0) {
        cnChapters.set(cnCurrentChap, {
            title_cn: cnTitle || `第 ${cnCurrentChap} 章`,
            content_cn: formatBody(cnBuffer)
        });
    }
    console.log(`Parsed ${cnChapters.size} translated chapters.`);
} else {
    console.log('No Chinese translation file found. Using English fallback.');
}

// Sort chapters just in case
chapters.sort((a, b) => a.chapter - b.chapter);

let outputChapters = [...finalStructure];

chapters.forEach(ch => {
    // Check if this chapter is the start of an Act
    const act = acts.find(a => a.start === ch.chapter);
    let finalContent = ch.content;

    // Default to English content for CN if missing
    let finalContentCn = ch.content;
    let finalTitleCn = ch.title; // Default to English title (raw title "The Strained Dinner Party")
    let isTranslated = false;

    // Override with translated content if available
    if (cnChapters.has(ch.chapter)) {
        const cnData = cnChapters.get(ch.chapter);
        finalContentCn = cnData.content_cn;
        finalTitleCn = cnData.title_cn;
        isTranslated = true;
    }

    if (act) {
        const partHeader = `<div class="part-header-inline"><h3>${act.title}</h3><hr class="part-divider"></div>`;
        finalContent = partHeader + finalContent;

        // Add CN Part Header
        const partHeaderCn = `<div class="part-header-inline"><h3>${act.title_cn || act.title}</h3><hr class="part-divider"></div>`;
        finalContentCn = partHeaderCn + finalContentCn;
    }

    outputChapters.push({
        chapter: ch.chapter,
        title: `Chapter ${ch.chapter}: ${ch.title}`,
        title_cn: isTranslated ? finalTitleCn : `Chapter ${ch.chapter}: ${finalTitleCn}`,
        content: finalContent,
        content_cn: finalContentCn
    });
});

const fileContent = `// book.js - Generated Content for The Imposter
PocketReader.bookContent = ${JSON.stringify(outputChapters, null, 4)};
`;

fs.writeFileSync(outputPath, fileContent);
console.log(`Generated data.js with ${outputChapters.length} entries.`);
