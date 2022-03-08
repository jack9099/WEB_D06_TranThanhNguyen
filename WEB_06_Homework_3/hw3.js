const fs = require('fs');

const txt1 = fs.readFileSync('./hw3-first.txt', 'utf8');
const txt2 = fs.readFileSync('./hw3-second.txt', 'utf8');

fs.writeFileSync('./hw3-finish-sync.txt', txt1 + '\n' + txt2);
