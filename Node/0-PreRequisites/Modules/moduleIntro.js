// Node.js Module Intro

// 1. What is a module in Node.js?
// --------------------------------
// - A module is a file that contains JavaScript code. In Node.js, each file is a separate module.
// - Modules have private scope. Variables and functions declared in a module are not global.
// - Node supports CommonJS (require/module.exports) and ES Modules (import/export).

// 2. Benefits of modules
// ----------------------
// - Encapsulation: keep implementation details private and expose only what is needed.
// - Reusability: use the same module in multiple files and projects.
// - Maintainability: divide code into small, focused files.
// - Testability: easier unit testing of isolated functionality.
// - Dependency management: Node runtime caches modules and handles cycles safely.

// 3. CommonJS module example (default for most Node.js versions)
// --------------------------------------------------------------
// File: mathUtils.js
// --------------
// function add(a, b) {
//   return a + b;
// }
//
// function multiply(a, b) {
//   return a * b;
// }
//
// module.exports = {
//   add,
//   multiply,
// };

// File: app.js
// -----------
// const math = require('./mathUtils');
//
// console.log('2 + 3 =', math.add(2, 3));
// console.log('4 * 5 =', math.multiply(4, 5));

// 4. Single value export (CommonJS)
// ---------------------------------
// File: config.js
// module.exports = {
//   port: 3000,
//   env: 'development',
// };
//
// File: app.js
// const config = require('./config');
// console.log('App running on port', config.port);

// 5. ES Module example (modern Node with "type": "module")
// ---------------------------------------------------------
// File: math.mjs
// export function add(a, b) {
//   return a + b;
// }
//
// export function multiply(a, b) {
//   return a * b;
// }
//
// File: app.mjs
// import { add, multiply } from './math.mjs';
//
// console.log('10 + 20 =', add(10, 20));
// console.log('6 * 7 =', multiply(6, 7));

// 6. Node built-in module example
// ------------------------------
// const fs = require('fs');
// const data = fs.readFileSync('sample.txt', 'utf8');
// console.log(data);

// 7. npm third-party module example
// ----------------------------------
// const express = require('express'); // install with npm install express
// const app = express();
// app.get('/', (req, res) => res.send('Hello from Express'));
// app.listen(3000, () => console.log('Server on 3000'));

// 8. Notes on module resolution
// -----------------------------
// - Relative paths start with ./ or ../
// - Core modules (fs/path/http) do not require path prefix
// - Node resolves index.js in directories automatically
// - package.json "main" controls module entry point

// 9. Mixing module systems
// ------------------------
// - CommonJS can `require()` ES modules using dynamic import when necessary.
// - ES Modules can import CommonJS with default import:
//     import pkg from './commonjs-file.js';
//     const value = pkg.myExport;

// Summary: Modules help structure Node apps by splitting logic into reusable files, making code more organized, secure, and scalable.
