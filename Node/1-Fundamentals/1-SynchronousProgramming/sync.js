// Synchronous programming is a programming paradigm where tasks are executed sequentially, one after the other.
// fs -> File-System is an internal module in Node.js 

const fs = require('fs');

// one dot(.) refers to the parent directory and two dots(..) refers to parent of parent directory.

const filePath = '../simpleFile.txt';
// const path = '../lenghtyFile.txt';

console.log(`${Date.now()} file reading started`);

// readFileSync() is a synchronous method that reads the contents of a file and returns it as a string.
// It blocks the execution of the program until the file is read completely.

const data = fs.readFileSync(filePath, 'utf-8');

console.log(`File contents: ${data}`);

console.log(`${Date.now()} file reading completed`);