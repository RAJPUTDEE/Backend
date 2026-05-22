//math-sqrt is a third party module/package that needs to be installed.
//NPM is used to deal with third party packages in Node.js.
//With running `npm install math-sqrt` command, this program gives an error 'module not found'., 

const sqrt = require('math-sqrt');

for (let i=0; i<100; i++) {
    console.log(`Square of ${i} is ${sqrt(i)}`);
}

console.log('Program execution completed');
