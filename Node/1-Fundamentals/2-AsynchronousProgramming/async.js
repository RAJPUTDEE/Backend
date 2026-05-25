const fs = require('fs');

const filePath = '../simpleFile.txt';

console.log(`${Date.now()} file reading started`);

// readFile() is an asynchronous method that reads a file.
// Every asynchronous method in Node.js takes a callback function as its last argument, which is called when the operation is complete.
// Here (err, data) => {} is the callback function.
// Callback functions are used to handle the results hence they are referred as handlers.

const data = fs.readFile(filePath, 'utf-8', (err,data) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log(`File content: ${data}`);
    console.log(`${Date.now()} file reading completed`);
})
// The readFile() method does not block the execution of the program, it allows other operations to be performed while the file is being read.
// But even if reading operation completes before the for loop,
// the callback function will be executed only after for loop is completed because of the event loop in Node.js.
// Hence in async all handlers are executed after compute operations.

console.log(`${Date.now()} In Ansync this will be executed before reading operation`);

for (let i=0; i<10; i++) {
    console.log(i);
}


