const fs = require('fs').promises;
const path = require('path');

async function copyDir(src = path.join(__dirname, 'files'), dest = path.join(__dirname, 'files-copy')) {
    const entries = await fs.readdir(src, { withFileTypes: true });
    await fs.rm(dest, {recursive: true, force: true});
    await fs.mkdir(dest, {recursive: true});

    const copyPromises = entries.map(entry => {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);

        return entry.isDirectory()
        ? copyDir(srcPath, destPath)
        : fs.copyFile(srcPath, destPath);
    });

    await Promise.all(copyPromises);    
}

copyDir();
