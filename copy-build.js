const fs = require('fs-extra');

// Копіюємо з docs-temp/browser в docs
fs.emptyDirSync('docs');
fs.copySync('docs-temp/browser', 'docs');
fs.removeSync('docs-temp');

console.log('✅ Build copied to docs/');
