/*
Ways to Run JavaScript Code
===========================

JavaScript can be executed in various environments. Below are common methods,
each with an easy-to-understand example that you can implement.

1. Browser Console
   - Open a web browser (Chrome, Firefox, etc.)
   - Press F12 or right-click > Inspect > Console tab
   - Type JavaScript code directly
   Example:
     console.log("Hello, World!");
     // Output: Hello, World!

2. HTML File with <script> Tag
   - Create an HTML file (e.g., index.html)
   - Add <script> tags in the <body> or <head>
   - Link to external JS file or write inline
   Example in HTML:
     <script>
       console.log("Hello from HTML!");
     </script>
   Or link this file: <script src="runningJS.js"></script>

3. Node.js Command Line
   - Install Node.js (https://nodejs.org)
   - Open terminal/command prompt
   - Run: node runningJS.js
   Example code to add:
     console.log("Hello from Node.js!");
     // Run with: node runningJS.js

4. Node.js REPL (Read-Eval-Print Loop)
   - Install Node.js
   - Open terminal and type: node
   - Interactive prompt appears
   - Type code line by line
   Example:
     > console.log("Hello REPL!");
     Hello REPL!
     > 2 + 3
     5

5. VS Code with Node.js Extension
   - Install VS Code (https://code.visualstudio.com)
   - Install Node.js extension
   - Open this file in VS Code
   - Press F5 or Ctrl+F5 to run/debug
   Example: Add this code and run:
     const message = "Hello VS Code!";
     console.log(message);

6. Online JavaScript Editors/Playgrounds
   - Websites like JSFiddle, CodePen, Repl.it
   - Paste code and run in browser
   Example:
     // In any online editor:
     alert("Hello Online Editor!");
     // Or console.log for output

7. Build Tools/Bundlers (Advanced)
   - Use tools like Webpack, Parcel, or Vite
   - For complex projects with modules
   Example with Node.js modules:
     // In a file:
     const fs = require('fs');
     console.log("File system available");
     // Run with: node file.js

Remember: Browser JS has access to DOM, Node.js has file system access.
Always test your code in the intended environment!
*/

// Example code you can run with Node.js:
// Uncomment the lines below and run: node runningJS.js

// console.log("This is a simple JavaScript example!");
// const sum = (a, b) => a + b;
// console.log("Sum of 5 and 3:", sum(5, 3));