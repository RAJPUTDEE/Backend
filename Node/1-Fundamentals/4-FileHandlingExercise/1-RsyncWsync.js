// Program to read synchronously from input file and write synchronously to output file.

const fs = require('fs');

const inputfile = './inputfile.txt';
const outputfile = './outputfile.txt';

console.log(`${Date.now()} File reading started`);

const data =fs.readFileSync(inputfile, 'utf-8');

console.log(`${Date.now()} File reading completed and writing started`);

fs.writeFileSync(outputfile, data);

console.log(`${Date.now()} File writing completed`);
