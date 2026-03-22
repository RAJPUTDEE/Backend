// Why only const is used to import the module?
// In JavaScript, the `const` keyword is used to declare variables that cannot be reassigned. When we import a module using `require`, we typically use `const` to ensure that the reference to the imported module cannot be changed accidentally later in the code. This is a common practice to maintain code integrity and prevent bugs that can arise from reassigning imported modules.
// Using `const` for imports is a convention that helps developers understand that the imported module is meant to be a constant reference throughout the code, even though the contents of the module itself can still be modified if it exports an object or function.
// If other than `const` is used, such as `let` or `var`, it would allow for the possibility of reassigning the imported module reference, which can lead to unintended consequences and make the code harder to debug. Therefore, using `const` is a best practice when importing modules in Node.js.
// Real time cases where let or var can be used to import modules are very rare and generally not recommended, as it can lead to confusion and potential bugs in the code. It is best to stick with `const` for importing modules to ensure clarity and maintainability of the codebase.

const callingSumApp = require('./sumApp');

// './' is used to indicate that the module is located in the same directory as the current file (app.js).
// '../' would be used to indicate that the module is located in the parent directory of the current file.
// this is called a relative path, and it tells Node.js to look for the module in the specified location relative to the current file.

callingSumApp(10, 20);

// When you run this code, it will import the sumApp function from the sumApp.js module and call it with the arguments 10 and 20. The output will be:
// The sum of 10 and 20 is: 30
// This demonstrates how to use a custom module in Node.js to perform a specific task (in this case, calculating the sum of two numbers) and how to export and import functionality between different files.
// If more than the required number of arguments are passed to the function, it will still work, but the extra arguments will be ignored. For example, if you call callingSumApp(10, 20, 30), it will still calculate the sum of 10 and 20 and ignore the extra argument 30. The output will still be:
// The sum of 10 and 20 is: 30
// This is because the function is defined to take only two parameters (a and b), and any additional arguments passed to the function will not be assigned to any parameters and will be ignored.
// If suppose (, 20) is passed, it will treat the first argument as undefined and the second argument as 20. The output will be:
// The sum of undefined and 20 is: NaN
// This is because when you try to add undefined to a number, it results in NaN (Not a Number). Therefore, it's important to ensure that the correct number of arguments are passed to the function to avoid unexpected results.
