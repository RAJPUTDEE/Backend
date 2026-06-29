// Program to read synchronously from input file and write asynchronously to output file.

const fs = require('fs');

const inputfile = 'inputfile.txt';
const outputfile = 'outputfile.txt';

console.log(`${Date.now()} File reading started`);

const data = fs.readFileSync(inputfile, 'utf-8');

console.log(`${Date.now()} File reading completed and writing started`);

fs.writeFile(outputfile, data, (err) => {
    if(err) throw err;
    console.log(`${Date.now()} File writing completed`);
});

console.log(`${Date.now()} In Ansync this will be executed before writing operation`);