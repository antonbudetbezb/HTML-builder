const fs = require('fs');
const path = require('path');

fs.readdir(path.join(__dirname, 'secret-folder'), {withFileTypes: true}, (err, files) => {
  if (err) throw new Error(err);
  files.forEach(file => {
    if (!file.isDirectory()) {
      let filename =  file.name;
      let ext = path.parse(filename).ext.slice(1);
      let name = path.parse(filename).name;
      let stats = fs.stat(path.join(__dirname, 'secret-folder', `${filename}`), (err, stats) => {
        console.log(`${name}-${ext}-${Math.ceil(stats.size/1024)}`)
      })
    }
  })
})