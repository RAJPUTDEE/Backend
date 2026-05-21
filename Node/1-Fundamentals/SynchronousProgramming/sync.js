const fs = require('fs');

const path = './simplefile.txt';

console.log(`"${Date.now()}", file reading started`);

const data = fs.readFileSync(path, 'utf-8');

console.log(data);

console.log(`"${Date.now()}", file reading completed`);