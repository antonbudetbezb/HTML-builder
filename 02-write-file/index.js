const fs = require('fs');
const path = require('path');
const process = require('process')
const { stdin, stdout } = process;

fs.writeFile(path.join(__dirname, 'text-02.txt'),
  '',
  err => {
  if (err) stdout.write('Error');
  stdout.write('Введите текст: \n');
});

stdin.on('data', data => {
  if(data.toString('utf8').trim() == 'exit') {
    stdout.write('Goodbye!');
    process.exit();
  };
});

stdin.on('data', data => {
  fs.appendFile(path.join(__dirname, 'text-02.txt'),
  data,
  err => {
    if (err) throw err;
    console.log('Файл изменён');
    stdout.write('Введите текст: \n');
  })
});

process.on('SIGINT', () => {
  stdout.write('Goodbye \n');
  process.exit();
})