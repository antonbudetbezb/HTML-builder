const fs = require('fs');
const path = require('path');
const { stdout } = process;
const ReadStream = fs.createReadStream(path.join(__dirname, 'text.txt'), 'utf-8');

let data = '';
ReadStream.on('data', (value) => {
  data += value;
});
ReadStream.on('end', () => {
  stdout.write(data);
});