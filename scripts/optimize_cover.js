const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const srcPath = path.join(__dirname, '../src/assets/images/the-imposter-cover.png');
const destPath = path.join(__dirname, '../src/assets/images/cover.jpg');

// Ensure source exists
if (!fs.existsSync(srcPath)) {
    console.error('Source file not found:', srcPath);
    process.exit(1);
}

try {
    console.log(`Optimizing cover image...`);
    console.log(`Source: ${srcPath}`);

    // Usage of sips:
    // -z [height] [width] : Resample to specified height and width (aspect ratio not preserved if both provided)
    // -Z [pixels] : Resample height and width ensuring that the maximum dimension is no greater than pixels (aspect ratio preserved)
    // -s format [format] : Set format
    // -s formatOptions [options] : Set format options (e.g. compression quality)

    // We want max width 800px, usually sufficient for mobile/web cover.
    // Retaining aspect ratio is critical. -Z 800 does exactly that (max dimension 800).
    // Convert to jpeg with 80% quality.

    execSync(`sips -Z 800 -s format jpeg -s formatOptions 80 "${srcPath}" --out "${destPath}"`);

    const oldSize = fs.statSync(srcPath).size / 1024 / 1024;
    const newSize = fs.statSync(destPath).size / 1024 / 1024;

    console.log(`Successfully optimized to ${destPath}`);
    console.log(`Size reduced from ${oldSize.toFixed(2)}MB to ${newSize.toFixed(2)}MB`);

} catch (error) {
    console.error('Failed to optimize cover:', error);
    process.exit(1);
}
