const fs = require('fs');
const path = require('path');

fs.rm(path.join(__dirname, './project-dist'), {recursive: true, force: true}, () => {
  fs.mkdir(path.join(__dirname, 'project-dist'), {recursive: true}, () => {
  
    //copy HTML
    fs.copyFile(path.join(__dirname, 'template.html'), path.join(__dirname, 'project-dist', 'index.html'), () => { 
      findPart();

      function findPart() {
        fs.readFile(path.join(__dirname, 'project-dist', 'index.html'), 'utf-8', (err, data) => {
          let content = data;
          if (content.includes(`{{`)) {
            let startIndex = content.indexOf(`{{`);
            let finishIndex = content.indexOf(`}}`, startIndex);
            let part = content.slice(startIndex+2, finishIndex);
            replaceParts(part);
          }
        });
      }
      function replaceParts (part) {
        fs.readFile(path.join(__dirname, 'project-dist', 'index.html'), 'utf-8', (err, data) => {
          let content = data;
          if (content.includes(`{{${part}}}`)) {
            let startIndex = content.indexOf(`{{${part}}}`);
            let length = `{{${part}}}`.length;
            fs.readFile(path.join(__dirname, 'components', `${part}.html`), 'utf-8', (err, innerText) => {
              content = content.slice(0, startIndex) + innerText + content.slice(startIndex + length);
              fs.writeFile(path.join(__dirname, 'project-dist', 'index.html'), content, () => {});
            })
          }
          findPart();
        });
      }
    });
  
    //Copy assets
    copyDirectory(path.join(__dirname, 'assets'),  path.join(__dirname, 'project-dist', 'assets'));
    function copyDirectory (origin, destination) {
      fs.mkdir(path.join(destination), {recursive: true}, () => {
        fs.readdir(origin, { withFileTypes: true}, (err, files) => {
          files.forEach(file => {
            if(file.isDirectory()) {
              copyDirectory(path.join(origin, `${file.name}`), path.join(destination, `${file.name}`), () => {})
            }
            if(file.isFile()) {
              fs.copyFile(path.join(origin, `${file.name}`), path.join(destination, `${file.name}`), () => {})
            }
          })
        })
      })
    }

    //Copy CSS
    fs.readdir(path.join(__dirname, 'styles'), {withFileTypes: true}, (err, files) => {
      let writeStyles = fs.createWriteStream(path.join(__dirname, 'project-dist', 'style.css'));
      files.forEach((file) => {
        if(path.parse(file.name).ext.slice(1) == 'css') {
          fs.createReadStream(path.join(__dirname, 'styles', file.name), 'utf8').on('data', data => {
            writeStyles.write(data)
          })
        }
      })
    });
  })
})