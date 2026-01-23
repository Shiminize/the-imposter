---
name: Chinese Story Translator
description: Guidelines for translating narrative content into Chinese while preserving literary style and integrating it into the codebase.
---

# 🇨🇳 Chinese Story Translator Skill

This skill guides you through translating the "Book Reader" content (`data.js`) into Chinese. It emphasizes **literary quality** over literal translation and provides a workflow for integrating multilingual support.

## 🎯 When to Use
- **Localizing Content**: When the user requests a Chinese version of the story.
- **Adding Language Support**: When implementing the UI toggle for EN/CN.

## 🧠 Philosophy
> **"Translate the Feeling, not just the Words."**
> The source material is a "Nordic Noir" style thriller (simulated Stieg Larsson). The Chinese translation must reflect this **cold, clinical, yet intense** atmosphere.

**Tone Guidelines:**
-   **Noa**: Poetic, delusional, tragic. Use slightly flowery but unstable language (e.g., "Sepia-toned delusion" -> "泛黄的妄想").
-   **Kyle**: Efficient, cold, corporate. Use precise, modern business terminology.
-   **Eline**: Analytical, detached, clinical. Use psychological/medical phrasing.

## 🚀 Workflows

### Workflow A: The "Dual-Data" Integration
Use this to structurally prepare the codebase for translation.

1.  **Schema Update**:
    Modify `src/features/reader/data.js` to support dual fields.
    ```javascript
    {
        chapter: 1,
        title: "PART I: THE DEFICIT",
        title_cn: "第一部：赤字",  // [NEW]
        content: "<p>...</p>",
        content_cn: "<p>...</p>" // [NEW]
    }
    ```

2.  **Logic Update**:
    Update `logic.js` to look for a language state.
    ```javascript
    const state = {
        lang: 'en', // or 'cn'
        // ...
    };
    
    // In renderChapter:
    const title = state.lang === 'cn' ? chapter.title_cn : chapter.title;
    const content = state.lang === 'cn' ? chapter.content_cn : chapter.content;
    ```

3.  **UI Update**:
    Add a language toggle in the Settings Drawer.

### Workflow B: The Translation Process
Use this when generating the content.

1.  **Extract**: Read `Novel.txt` or `data.js` chunk by chunk.
2.  **Translate**:
    -   *Input*: "The Netherlands is a country of engineered landscapes..."
    -   *Draft*: "荷兰是一个人造景观的国家..." (Too literal)
    -   *Polish*: "荷兰，一个精密规划的国度；这里的每一寸土地都经过丈量，每一片疆土都夺自沧海..." (Literary/Noir)
3.  **Validate**: Ensure HTML structure (`<p>`) is preserved.

## 🛠️ Toolbelt

### Common Terminology Map
| English Term | Context | Chinese Translation | Note |
| :--- | :--- | :--- | :--- |
| **"HelloTalk"** | The App | HelloTalk | Keep English brand name usually, or "语言学习APP" |
| **"Social Housing"** | Setting | 廉租房 / 社会福利房 | Conveys lower economic status |
| **"Polders"** | Geography | 围垦地 / 圩田 | Specific Dutch term |
| **"Apex Predator"** | Metaphor | 顶级掠食者 | Strength/Danger |

## ✅ Checklist
- [ ] Is the JSON valid? (Comma errors are common when pasting large text)
- [ ] Are HTML tags preserved?
- [ ] Does the tone match the character?
