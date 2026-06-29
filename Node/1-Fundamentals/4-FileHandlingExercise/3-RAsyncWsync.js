// Program to read asynchronously from input file and write synchronously to output file.

const fs = require('fs');

const inputfile = 'inputfile.txt';
const outputfile = 'outputfile.txt';

console.log(`${Date.now()} Async reading started`);

fs.readFile(inputfile, 'utf-8', (err,data) => {
    if(err){
        console.log(err);
        return;
    }
    console.log(`${Date.now()} Reading will start but is completed after writing operation because of event loop`);
    fs.writeFileSync(outputfile, data);
    console.log(`${Date.now()} Synchronous writing completed`);
})