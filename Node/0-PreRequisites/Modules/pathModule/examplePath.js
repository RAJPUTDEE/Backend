// Lets understand the path module in node js
// The path module provides utilities for working with file and directory paths. It can be used to manipulate file paths in a way that is consistent across different operating systems. The path module is part of the Node.js core modules, so you can use it without installing any additional packages.
// It exists because different operating systems use different path separators (e.g., '/' on Unix-based systems and '\' on Windows). The path module helps to handle these differences and provides a consistent way to work with file paths.

//declare a variable to require the path module
const path = require('path');

console.log(path.extname('index.yxz')); // Output: .html its an example file name


// Example of using path module to join two paths
//File present inside Javascript folder
const filePath = path.join("Javascript", "index.html");
console.log('Joined Path:', filePath); // Output: Joined Path: Javascript/index.html (on Unix-based systems) or Joined Path: Javascript\index.html (on Windows)

//If multiple paths are joined, the path.join() method will normalize the resulting path by resolving any '..' and '.' segments. For example:
// Joining multiple paths with normalization
// const complexPath = path.join('folder1', 'folder2', '..', 'folder3', '.', 'file.txt');