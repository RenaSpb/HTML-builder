const fs = require('fs');
const path = require('path');

const folderPath = path.join(__dirname, 'secret-folder');

fs.readdir(folderPath, { withFileTypes: true }, (err, files) => {
    if (err) {
      console.error('Error:', err.message);
      return;
    }
  
    files.forEach((file) => {
      if (file.isFile()) {
        const filePath = path.join(folderPath, file.name);
        const { name, ext } = path.parse(file.name);
  
        fs.stat(filePath, (err, stats) => {
          if (err) {
            console.error('Error:', err.message);
            return;
          }
  
          const fileSize = stats.size / 1024; 
          console.log(`${name} - ${ext.slice(1)} - ${fileSize.toFixed(3)}kb`);
        });
      }
    });
  });
  