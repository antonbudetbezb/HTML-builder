const fs = require('fs');
const path = require('path');

function copyDir() {

  fs.mkdir(path.join(__dirname, 'files-copy'), {recursive: true}, () => {

    fs.readdir(path.join(__dirname, 'files-copy'), (err, files) => {
      files.forEach((file) => {
        fs.unlink(path.join(__dirname,'files-copy', file), err => {})
      });
    });

    fs.readdir(path.join(__dirname, 'files'), {withFileTypes: true}, (err, files) => {
      files.forEach(file => {
        if (file.isFile()) {
          fs.copyFile(path.join(__dirname, 'files', file.name), path.join(__dirname, 'files-copy', file.name), err => {})
        }
      })
    })
    console.log('Создана папка');

  });
}
copyDir();