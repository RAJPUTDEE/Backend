// Program that reads asynchronously from input file and writes asynchronously to output file.

const fs = require('fs');

fs.readFile('./inputfile.txt', 'utf-8', (err,data) => {
    console.log(`${Date.now()} Async reading started`);
    if(err){
        console.log(err);
    }
    fs.writeFile('./outputfile.txt', data, (err) => {
        if(err){
            console.log(err);
            }
        })
    console.log(`${Date.now()} Async writing started`);
})

console.log(`${Date.now()} In Async this will be executed before any async operation`);
