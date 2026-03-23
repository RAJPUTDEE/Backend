// It is to create a function that takes two numbers as input and returns their sum. This function can be used in other parts of the application or even in other applications by importing it as a module.
// To make a function usable as a module in Node.js, we can use the `module.exports` object to export the function. This allows other files to import and use the function when needed.
// Later we can also use import and export syntax to achieve the same functionality, but for now, we will stick to the CommonJS module system which is widely used in Node.js.

function sumApp(a, b) {
    const sum = a + b;
    console.log(`The sum of ${a} and ${b} is: ${sum}`);
}

module.exports = sumApp;

// Standard Node.js module object properties (CommonJS):
// module.id        - module identifier (usually file path)
// module.filename  - resolved absolute filename of this module
// module.loaded    - boolean, true when module has been loaded
// module.parent    - reference to module that required this one (null for entry script)
// module.children  - array of modules required by this module
// module.paths     - array of lookup paths for require() resolution
// module.exports   - value returned to the caller from require()
// exports         - alias to module.exports (do not reassign exports directly)
// __filename      - absolute path of the current module file
// __dirname       - directory name of the current module file
// require         - function to load other modules
