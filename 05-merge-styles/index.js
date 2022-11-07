const fs = require('fs');
const path = require('path');

fs.readdir(path.join(__dirname, 'styles'), {withFileTypes: true}, (err, files) => {
  let styles = fs.createWriteStream(path.join(__dirname, 'project-dist', 'bundle.css'));
  files.forEach(file => {
    if (path.parse(file.name).ext.slice(1) == 'css' && !file.isDirectory()) {
      fs.createReadStream(path.join(__dirname, 'styles', file.name), 'utf-8').on('data', data => {
        styles.write(data)
      })
    }
  })
});