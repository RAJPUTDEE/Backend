// To define the structure of a module in Node.js, we can create a JavaScript file that contains the functionality we want to export. In this case, we will create a module that calculates the sum of two numbers and logs the result to the console.
function addSum(a, b) {
    const sum = a + b;
    console.log(`The sum of ${a} and ${b} is: ${sum}`);
}

addSum(4.1, -40.2);

// This will log the module object, which contains information about the current module, including its exports and other metadata.

console.log(module);

// When you run console.log(module), you'll see an object with these key properties:

// - id: Unique identifier for the module. For the main module (entry point), it's '.'.
// - path: The directory path where this module file is located.
// - exports: Object containing what this module exports (empty {} here since nothing is exported).
// - filename: The fully resolved absolute path to this module file.
// - loaded: Boolean indicating if the module has finished loading (false during execution, true after).
// - children: Array of module objects for modules required by this module (empty [] here).
// - paths: Array of directories Node.js searches when resolving module dependencies.
// - [Symbol properties]: Internal Node.js symbols for module management:
//   * Symbol(kIsMainSymbol): true if this is the main entry point module
//   * Symbol(kIsCachedByESMLoader): false (related to ES module caching)
//   * Symbol(kURL): undefined (URL representation, used in newer Node versions)
//   * Symbol(kFormat): undefined (module format: 'commonjs', 'module', etc.)
//   * Symbol(kIsExecuting): true while the module is currently being executed