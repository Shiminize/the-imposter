---
name: French Story Translator
description: Guidelines for translating narrative content into French while preserving literary style and integrating it into the codebase.
---

# 🇫🇷 French Story Translator Skill

This skill guides you through translating the "Book Reader" content (`data.js`) into French. It emphasizes **literary quality** over literal translation and provides a workflow for integrating multilingual support.

## 🎯 When to Use
- **Localizing Content**: When the user requests a French version of the story.
- **Adding Language Support**: When implementing the UI toggle for EN/FR.

## 🧠 Philosophy
> **"Traduisez le Ressenti, pas seulement les Mots."** (Translate the Feeling, not just the Words.)
> The source material is a "Nordic Noir" style thriller (simulated Stieg Larsson). The French translation must reflect this **cold, clinical, yet intense** atmosphere (*Polars Nordiques*).

**Tone Guidelines:**
-   **Noa**: *Poétique, délirant, tragique*. Use slightly flowery but unstable language (e.g., "Sepia-toned delusion" -> *"Illusion sépia"* or *"Délire aux teintes sépia"*).
-   **Kyle**: *Efficace, froid, corporatif*. Use precise, modern business terminology (*terminologie d'affaires moderne*).
-   **Eline**: *Analytique, détachée, clinique*. Use psychological/medical phrasing.

## 🚀 Workflows

### Workflow A: The "Dual-Data" Integration
Use this to structurally prepare the codebase for translation.

1.  **Schema Update**:
    Modify `src/features/reader/data.js` to support dual fields.
    ```javascript
    {
        chapter: 1,
        title: "PART I: THE DEFICIT",
        title_fr: "PREMIÈRE PARTIE : LE DÉFICIT",  // [NEW]
        content: "<p>...</p>",
        content_fr: "<p>...</p>" // [NEW]
    }
    ```

2.  **Logic Update**:
    Update `logic.js` to look for a language state.
    ```javascript
    const state = {
        lang: 'en', // or 'fr'
        // ...
    };
    
    // In renderChapter:
    const title = state.lang === 'fr' ? chapter.title_fr : chapter.title;
    const content = state.lang === 'fr' ? chapter.content_fr : chapter.content;
    ```

3.  **UI Update**:
    Add a language toggle in the Settings Drawer.

### Workflow B: The Translation Process
Use this when generating the content.

1.  **Extract**: Read `Novel.txt` or `data.js` chunk by chunk.
2.  **Translate**:
    -   *Input*: "The Netherlands is a country of engineered landscapes..."
    -   *Draft*: "Les Pays-Bas sont un pays de paysages artificiels..." (Too literal)
    -   *Polish*: "Les Pays-Bas, une nation aux paysages façonnés par l'homme ; où chaque parcelle de terre a été calculée, chaque territoire arraché à la mer..." (Literary/Noir)
3.  **Validate**: Ensure HTML structure (`<p>`) is preserved.

## 🛠️ Toolbelt

### Common Terminology Map
| English Term | Context | French Translation | Note |
| :--- | :--- | :--- | :--- |
| **"HelloTalk"** | The App | HelloTalk | Keep English brand name usually, or "Application d'échange linguistique" |
| **"Social Housing"** | Setting | Logement social / HLM | Conveys lower economic status |
| **"Polders"** | Geography | Polders | Specific Dutch term, also used in French |
| **"Apex Predator"** | Metaphor | Superprédateur | Strength/Danger |

## ✅ Checklist
- [ ] Is the JSON valid? (Comma errors are common when pasting large text)
- [ ] Are HTML tags preserved?
- [ ] Does the tone match the character?
