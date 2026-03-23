// Using fs along with path to create a file path
// The fs module provides an API for interacting with the file system in a manner closely modeled around standard POSIX functions. It can be used to read, write, and manipulate files and directories. The path module can be used in conjunction with the fs module to create file paths that are compatible with the operating system.

const fs = require('fs');
const path = require('path');

// Create a file path using path.join
const filePath = path.join("..", "SumUsingModule", "sumApp.js");

// Accessing the file using fs module to read the contents of the file
fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
    } else {
        console.log('File contents:', data);
    }
});

// Some other fs module methods that can be used with path module:
// fs.writeFile() - to write data to a file
// fs.appendFile() - to append data to a file
// fs.rename() - to rename a file
// fs.unlink() - to delete a file
// fs.mkdir() - to create a directory
// fs.rmdir() - to remove a directory
