The # 📖 How to Publish a New Novel

Follow these steps to create a new website for a different book using this engine.

## Step 1: Clone or Copy
1.  If using GitHub Templates: Click **"Use this template"** to create a new repo.
2.  If local: Copy the entire folder to a new location (e.g., `MyNewBook/`).

## Step 2: Swap the Cartridge (Content)
1.  Go to `src/features/reader/`.
2.  Delete `data.js` (The old story).
3.  Rename `data.sample.js` to `data.js`.
4.  Open `data.js` and paste your new story content inside the JSON structure.
    *   **Note**: Keep the connection `PocketReader.bookContent = [...]` matching the file.

## Step 3: Add Cover Image
1.  Save your book cover image as **`cover.jpg`** (Optimized JPEG, must be named 'cover').
2.  Replace the existing file in `src/assets/images/cover.jpg`.
3.  **No code change needed** if you use this exact name.

## Step 3: Update Metadata
1.  Open `index.html`.
2.  Change the `<title>` tag:
    ```html
    <title>My New Novel Title</title>
    ```
3.  (Optional) Change `<h3>Pocket Reader</h3>` in the drawer to your book title.

## Step 4: Password Protection (Optional)
If you want to lock the content:
1.  Open your browser console on the dev site.
2.  Run the encryption snippet from `ENCRYPT_TOOL.js` with your chosen password.
3.  Replace the `PocketReader.bookContent = [...]` block in `data.js` with the generated `PocketReader.encryptedContent = "..."` string.
4.  The "Gatekeeper" will automatically detect the encrypted string and show the login screen.

## Step 5: Publish
1.  Initialize Git:
    ```bash
    git init
    git add .
    git commit -m "Initial commit of New Novel"
    ```
2.  Create a new GitHub Repository.
3.  Push and enable GitHub Pages (Settings > Pages > source: main).
