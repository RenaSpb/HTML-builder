const fs = require('fs');
const path = require('path');

const stylesDir = path.join(__dirname, 'styles');
const outputDir = path.join(__dirname, 'project-dist');
const bundlePath = path.join(outputDir, 'bundle.css');

fs.promises.mkdir(outputDir, { recursive: true })
  .then(() => {
    return fs.promises.readdir(stylesDir, { withFileTypes: true });
  })
  .then((files) => {
    const cssFiles = files.filter(file => file.isFile() && path.extname(file.name) === '.css');
    
    const readPromises = cssFiles.map(file => {
      const filePath = path.join(stylesDir, file.name);
      return fs.promises.readFile(filePath, 'utf-8');
    });

    return Promise.all(readPromises).then(contents => contents.join('\n'));
  })
  .then((combinedStyles) => {
    return fs.promises.writeFile(bundlePath, combinedStyles, 'utf-8');
  })
  .then(() => {
    console.log(`Styles successfully merged into ${bundlePath}`);
  })
  .catch((err) => {
    console.error('An error occurred:', err);
  });
