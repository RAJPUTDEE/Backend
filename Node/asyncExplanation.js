/*
  ===== WHAT IS ASYNC? =====
  
  DEFINITION:
  Async (Asynchronous) means operations that don't happen immediately or in sequence.
  Instead of waiting for a task to complete, the program continues with other work
  and gets notified when the task is done.
  
  Think of it like ordering food at a restaurant:
  - SYNCHRONOUS (blocking): You order, stand at the counter, and wait for your food to be ready.
    The entire restaurant stops to prepare your order. Everyone else waits.
  
  - ASYNCHRONOUS (non-blocking): You order, get a buzzer/ticket, and sit down. 
    The kitchen prepares your order while other customers order too.
    When your food is ready, the buzzer alerts you.
    
  REAL-WORLD USE CASES:
  
  1. WEB REQUESTS:
     When a web server gets 1000 requests, it can't handle them one by one.
     It starts processing request 1, but while waiting for the database to respond,
     it starts processing request 2, 3, etc. This way, more requests are served faster.
     
     Example: A user uploads an image. While the server saves it to disk,
     it can handle 100 other requests instead of making everyone wait.
  
  2. FILE OPERATIONS:
     Reading/writing large files blocks synchronous operations.
     Async allows reading a 1GB file without freezing the application.
     
     Example: A data processing app reads 10 CSV files. Instead of:
     - Read file 1 (wait 2s) → Process (wait 1s) → Read file 2 (wait 2s)...
     It does: Read all 10 files in parallel (2s total), process them as they arrive.
  
  3. DATABASE QUERIES:
     Waiting for database responses blocks everything.
     Async lets the server handle other users while waiting for your query.
     
     Example: 100 users query the database. If synchronous, it takes 100 × 5s = 500 seconds.
     With async, 100 queries might run in parallel in ~5 seconds total.
  
  4. API CALLS:
     Fetching data from external APIs takes time (network latency).
     Async prevents your app from freezing while waiting for the response.
     
     Example: A mobile app needs weather from 3 APIs. 
     Async fetches all 3 in parallel: 1s instead of 3s.

  WHY NOT SYNCHRONOUS?
  - Single user waiting isn't bad, but servers handle thousands of users
  - One slow operation blocks everyone
  - Poor performance and bad user experience
  - Threads/processes are expensive (memory, CPU)
  - Async uses one thread efficiently with the event loop
*/

/*
  ===== ASYNC/AWAIT IN NODE.JS =====
  
  Async/Await is a modern way to handle asynchronous operations in JavaScript/Node.js.
  It makes asynchronous code look and behave more like synchronous code, making it easier to read and understand.
*/

// ============================================
// KEY TERMINOLOGIES IN ASYNC PROGRAMMING
// ============================================

/*
  PROMISE - The Foundation of Async
  
  A Promise is an object that represents a value which may or may not be available yet,
  but will be resolved (or rejected) at some point in the future.
  
  Think of it like a real promise:
  - You promise your friend you'll call them back tomorrow
  - They don't know exactly when, but they know you WILL call (hopefully!)
  - You either fulfill the promise (call them) or break it (don't call)
  
  PROMISE STATES (3 possible states):
  
  1. PENDING: Initial state, operation hasn't completed yet
     Example: fetch('api.com/data') - request sent, waiting for response
  
  2. FULFILLED/RESOLVED: Operation completed successfully
     The Promise has a value/result
     Example: Response received with data
  
  3. REJECTED: Operation failed
     The Promise has a reason for failure (error)
     Example: Network error, timeout, invalid data
  
  Once a Promise is resolved or rejected, it CANNOT change states.
  
  CREATING A PROMISE:
  
  const myPromise = new Promise((resolve, reject) => {
    // resolve(value) - fulfills the promise with a value
    // reject(error) - rejects the promise with an error
  });
  
  Example:
  
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Success!"); // Resolves after 1 second
    }, 1000);
  });
  
  Note: resolve and reject are CALLBACK FUNCTIONS that control the Promise state.


  .then() - Handling Success
  
  .then() executes when a Promise is RESOLVED (succeeds).
  It receives the resolved value as a parameter.
  
  Syntax: promise.then((value) => { // do something with value
  })
  
  Example:

  fetch('api.com/user')
    .then((response) => console.log("Got response:", response))
    .then((data) => console.log("Processed data:", data));
  
  Multiple .then() calls are CHAINED.


  .catch() - Handling Errors
  
  .catch() executes when a Promise is REJECTED (fails).
  It receives the error as a parameter.
  
  Syntax: promise.catch((error) => { // handle error
  })
  
  Example:
  
  fetch('api.com/user')
    .then((response) => console.log("Success:", response))
    .catch((error) => console.error("Failed:", error));
  
  .catch() catches ANY error in the entire promise chain!


  CALLBACK - The Old Way (Before Promises)
  
  A Callback is a function passed to another function that executes later.
  
  Example (old style):
  
  function fetchData(onSuccess, onError) {
    setTimeout(() => {
      onSuccess("Data loaded!");  // Call the success function
    }, 1000);
  }
  
  fetchData(
    (result) => console.log(result),     // Success callback
    (error) => console.error("Failed")   // Error callback
  );
  
  PROBLEMS with callbacks:
  - Callback hell (deeply nested code)
  - Hard to read and maintain
  - Error handling is awkward
  
  PROMISES/ASYNC-AWAIT are better than callbacks!


  EVENT LOOP - How Node.js Handles Async
  
  Node.js uses a SINGLE thread with an EVENT LOOP.
  The event loop constantly checks for tasks and executes them.
  
  Flow:
  1. Call stack: Execute synchronous code
  2. Async operations go to background (file system, network, timers)
  3. When async operation completes, callback goes to event queue
  4. Event loop picks up queued callbacks and runs them
  5. Repeat
  
  This allows ONE thread to handle millions of operations!
  
  Example:
  
  console.log("1. Start");           // Call stack (prints immediately)
  
  setTimeout(() => {
    console.log("2. Timeout");       // Goes to event queue
  }, 0);
  
  console.log("3. End");             // Call stack (prints immediately)
  
  Output: 1, 3, 2 (not 1, 2, 3!)
  Because setTimeout goes to event queue, while 3 executes in call stack first.


  RESOLVE vs REJECT
  
  These are CALLBACK FUNCTIONS inside a Promise that control its state:
  
  resolve(value): 
  - Fulfills the promise with a value
  - Transitions promise from PENDING to RESOLVED
  - .then() handlers will execute with this value
  
  reject(error):
  - Rejects the promise with an error
  - Transitions promise from PENDING to REJECTED
  - .catch() handlers will execute with this error
  
  Example:
  
  const promise = new Promise((resolve, reject) => {
    const success = true;
    
    if (success) {
      resolve("All good!");        // Promise is RESOLVED
    } else {
      reject(new Error("Failed!")); // Promise is REJECTED
    }
  });
  
  promise
    .then((result) => console.log(result))  // Executes if resolved
    .catch((error) => console.log(error));  // Executes if rejected


  SUMMARY OF KEY TERMS:
  
  ✅ Promise: Object representing a future value/error
  ✅ Resolve: Fulfill a promise successfully
  ✅ Reject: Reject a promise with an error
  ✅ .then(): Handle resolved promise
  ✅ .catch(): Handle rejected promise
  ✅ Callback: Function passed to another function
  ✅ Event Loop: Node.js mechanism for handling async operations
  ✅ Async/Await: Modern syntax on top of Promises for cleaner code
*/



// ============================================
// 1. UNDERSTANDING THE PROBLEM (Callback Hell)
// ============================================

// WITHOUT async/await - using callbacks (harder to read)
function fetchDataCallback() {
  console.log("\n--- Callback Approach (Callback Hell) ---");
  
  // Basic callback functions - execute code when operation completes
  function getUser(userId, callback) {
    // Callback is a function passed here that will execute later
    setTimeout(() => {
      console.log("User fetched:", { id: userId, name: "John" });
      callback(null, { id: userId, name: "John" }); // Call the callback with result
    }, 1000);
  }

  function getOrdersCallback(getUserErr, user, callback) {
    // Error-first callback convention: error is first parameter
    if (getUserErr) {
      callback(getUserErr); // Pass error to callback
      return;
    }
    setTimeout(() => {
      console.log("Orders fetched:", [{ orderId: 1, amount: 100 }]);
      callback(null, [{ orderId: 1, amount: 100 }]); // null = no error, then data
    }, 1000);
  }

  // The Problem: NESTED CALLBACKS = CALLBACK HELL
  // Each operation waits for the previous one, creating pyramid of doom
  getUser(1, (err, user) => {
    if (err) {
      console.error("Error:", err);
      return;
    }
    // We're nested one level deep
    getOrdersCallback(err, user, (err, orders) => {
      if (err) {
        console.error("Error:", err);
        return;
      }
      // We're nested two levels deep!
      // Error handling at every level is tedious
      console.log("Final Result:", { user, orders });
      
      // Imagine 5 nested operations... this gets ugly fast!
    });
  });
}


// ============================================
// 2. WITH ASYNC/AWAIT (Clean & Readable)
// ============================================

// Helper function that returns a Promise
// This function creates and returns a Promise that resolves after ms milliseconds
function delay(ms, value) {
  return new Promise((resolve) => {
    // Create a Promise with two parameters: resolve and reject
    // resolve(value) - fulfills the promise with a value
    setTimeout(() => {
      resolve(value); // After ms time, resolve with the value
    }, ms);
  });
}

// async function - automatically returns a Promise
// Can use 'await' inside to pause execution
async function fetchDataAsync() {
  try {
    console.log("\n--- Async/Await Approach (Much Cleaner) ---");
    
    // await pauses execution here until the Promise from delay() fulfills
    // Then unwraps it and assigns the actual value to 'user'
    const user = await delay(1000, { id: 1, name: "John" });
    console.log("User fetched:", user);

    // This only runs after the previous await completes
    const orders = await delay(1000, [{ orderId: 1, amount: 100 }]);
    console.log("Orders fetched:", orders);

    console.log("Final Result:", { user, orders });
    return { user, orders };
    
  } catch (error) {
    // Catches any error from the await statements above
    // Much cleaner than passing error callbacks
    console.error("Error:", error);
  }
}


// ============================================
// 3. HOW ASYNC/AWAIT WORKS
// ============================================

/*
  ASYNC KEYWORD - Creates an Async Function
  
  An async function is a function declared with the 'async' keyword.
  
  Key Properties of async functions:
  
  1. ALWAYS returns a Promise
     - Even if you return a regular value, it's wrapped in a Promise
     - Example: async function getNumber() { return 5; }
               Returns: Promise that resolves to 5
  
  2. CAN use 'await' inside it
     - Regular functions cannot use await
     - Only async functions can pause execution with await
  
  3. ERROR HANDLING with try/catch
     - Errors thrown inside async function reject the returned Promise
     - Perfect for error handling
  
  Syntax:
  
  async function myFunction() {
    return "Hello"; // Returns a Promise resolving to "Hello"
  }
  
  const result = myFunction(); // result is a Promise, not "Hello"!
  
  AWAIT KEYWORD - Wait For Promise
  
  await pauses execution of an async function until a Promise settles.
  
  Key Properties of await:
  
  1. PAUSES execution
     - Code after await doesn't run until Promise resolves
     - Appears synchronous but is actually asynchronous
  
  2. RETURNS the resolved value
     - Unwraps the Promise and gets the actual value
     - If Promise rejects, throws an error (caught by try/catch)
  
  3. CAN ONLY BE USED in async functions
     - Using await outside async function = SyntaxError
  
  Syntax:
  
  const value = await promise; // Waits and gets the actual value
  
  FLOW EXAMPLE:
  
  async function example() {
    console.log("1. Before await");
    
    const result = await delay(2000, "Done!"); // Pauses here for 2 seconds
    
    console.log("2. After await");
    console.log("3. Result:", result);
  }
  
  Execution:
  - Prints: "1. Before await"
  - Waits 2 seconds...
  - Prints: "2. After await"
  - Prints: "3. Result: Done!"
*/

async function demonstrateAsyncAwait() {
  console.log("\n--- How Async/Await Works ---");
  
  // Part 1: Async function always returns a Promise
  const promiseExample = (async () => {
    return "This is wrapped in a Promise";
  })();
  
  console.log("1. Return value type:", promiseExample.constructor.name); // Promise
  
  // Part 2: Await unwraps the Promise to get the actual value
  const value = await promiseExample;
  console.log("2. Actual value:", value);
  
  // Part 3: Await pauses execution
  console.log("3. Starting async operation...");
  const result = await delay(2000, "Operation completed!");
  console.log("4.", result);
  
  // Part 4: Error handling
  try {
    const rejected = await Promise.reject("Something went wrong");
  } catch (error) {
    console.log("5. Error caught:", error);
  }
  
  return result;
}


// ============================================
// 4. PARALLEL EXECUTION vs SEQUENTIAL
// ============================================

/* 
  UNDERSTANDING PARALLEL vs SEQUENTIAL:
  
  SEQUENTIAL: Operations happen one after another
  - Task 1 waits for Task 1 to finish
  - Then Task 2 starts
  - Then Task 3 starts
  - Time: Task1_time + Task2_time + Task3_time
  
  PARALLEL: Operations happen at the same time
  - Task 1, Task 2, Task 3 all start together
  - They happen simultaneously
  - Time: max(Task1_time, Task2_time, Task3_time)
  
  PROMISE.ALL() - Wait For All Promises
  
  Promise.all() takes an array of promises and returns a new promise that:
  - Resolves when ALL promises are resolved (with array of results)
  - Rejects if ANY promise rejects (short-circuit)
  - Perfect for parallel execution
  
  Syntax: Promise.all([promise1, promise2, promise3])
  
  Use when: You need ALL results and can proceed only when all are done
  
  PROMISE.RACE() - Race Multiple Promises
  
  Promise.race() takes an array of promises and returns a new promise that:
  - Resolves/Rejects with the FIRST promise to settle
  - Ignores other promises after first one completes
  - Perfect for timeout scenarios or first-to-finish scenarios
  
  Syntax: Promise.race([promise1, promise2, promise3])
  
  Use when: You only need the fastest response or want timeout handling
*/

async function sequentialExecution() {
  console.log("\n--- Sequential Execution (2 seconds total) ---");
  console.log("Start:", new Date().toISOString());
  
  // WAIT for Task 1 to complete, THEN start Task 2
  const result1 = await delay(1000, "Task 1 done");
  console.log(result1);
  
  // WAIT for Task 2 to complete, THEN start Task 3
  const result2 = await delay(1000, "Task 2 done");
  console.log(result2);
  
  console.log("End:", new Date().toISOString());
  // Total: ~2 seconds (1s + 1s = 2s)
  // SLOWER: Tasks wait for each other
}

async function parallelExecution() {
  console.log("\n--- Parallel Execution (1 second total) ---");
  console.log("Start:", new Date().toISOString());
  
  // START both tasks immediately using Promise.all()
  // This is the KEY difference! Both start at the same time
  const [result1, result2] = await Promise.all([
    delay(1000, "Task 1 done"),
    delay(1000, "Task 2 done")
  ]);
  
  console.log(result1);
  console.log(result2);
  
  console.log("End:", new Date().toISOString());
  // Total: ~1 second (both run simultaneously)
  // FASTER: Tasks run in parallel
  
  // If either promise rejects, Promise.all() rejects immediately
  // The other promise keeps running in background
}


// ============================================
// 5. BENEFITS OF ASYNC/AWAIT
// ============================================

/*
  TRY/CATCH - Error Handling for Async/Await
  
  try/catch is a standard JavaScript error handling mechanism.
  
  TRY: Contains code that might throw an error
  CATCH: Catches any error thrown in the try block
  
  Syntax:
  
  try {
    // Code that might error
    const result = await somePromise;
    console.log(result);
  } catch (error) {
    // Handles errors from try block
    console.error("Error caught:", error);
  }
  
  WHY TRY/CATCH IS BETTER THAN .catch():
  - Works with both synchronous and asynchronous code
  - Catches errors from any line in the try block
  - Standard JavaScript error handling (like other languages)
  - Cleaner than chaining .catch() at the end
  
  FINALLY (Optional):
  
  try {
    // something
  } catch (error) {
    // handle error
  } finally {
    // Runs whether try OR catch executes
    // Perfect for cleanup (close files, database connections, etc.)
  }
*/

async function demonstrateBenefits() {
  try {
    console.log("\n--- Benefits of Async/Await ---");
    
    // 1. Clean error handling with try/catch
    const apiResponse = await delay(500, { status: 200, data: "Success" });
    console.log("✅ Clean error handling with try/catch");
    
    // 2. Natural data flow - code reads like synchronous code
    const processedData = apiResponse.data.toUpperCase();
    console.log("✅ Natural data flow:", processedData);
    
    // 3. Can mix sync and async in the same try block
    const multiplied = 5 * 10;
    console.log("✅ Mix sync and async:", multiplied);
    
  } catch (error) {
    // This catches errors from ANY line in the try block!
    // Much better than separate .catch() chains
    console.error("❌ Error caught:", error);
  } finally {
    // This runs whether try succeeded OR catch caught an error
    console.log("✅ Cleanup would happen here (close connections, etc.)");
  }
}


// ============================================
// 6. LIMITATIONS OF ASYNC/AWAIT
// ============================================

/*
  LIMITATIONS:
  
  ❌ CAN'T USE OUTSIDE ASYNC FUNCTION:
     - await can only be used inside async functions (except top-level await in ES2022+)
     - Trying to use await in regular function = SyntaxError
     - Workaround: Wrap in async function or use .then()
  
  ❌ CPU-INTENSIVE TASKS:
     - Async ONLY helps with I/O operations (network, files, database, timers)
     - Does NOT help with CPU-intensive calculations
     - Heavy computations still BLOCK the event loop
     - Solution: Use Worker Threads for CPU tasks
  
  ❌ COMPLEXITY IN LOOPS:
     - Don't use forEach with await - it doesn't wait properly
     - Must use for...of loop or Promise.all() + map()
     - forEach starts all iterations immediately, doesn't await
  
  ❌ UNHANDLED REJECTIONS:
     
     If a Promise rejects and you don't handle it with .catch() or try/catch,
     your application might crash or behave unexpectedly.
     
     Example of BAD code:
     
     async function badCode() {
       const result = await Promise.reject("Error!");  // ❌ Not handled!
       console.log(result);
     }
     
     badCode(); // This rejection is NOT caught = Unhandled Rejection
     
     SOLUTION: Always handle rejections
     
     // ✅ With try/catch
     async function goodCode1() {
       try {
         const result = await Promise.reject("Error!");
       } catch (error) {
         console.error(error); // ✅ Handled!
       }
     }
     
     // ✅ With .catch()
     goodCode1().catch(console.error);
  
  ❌ PERFORMANCE IN LOOPS:
     - Sequential awaits are SLOW (waits for each operation)
     - Must use Promise.all() for speed
     - Example:
       - Sequential: 10 await calls × 1s each = 10s total
       - Parallel: Promise.all(10 promises) = ~1s total
*/

async function demonstrateLimitations() {
  console.log("\n--- Limitations of Async/Await ---");
  
  // Limitation 1: Can't use await outside async function
  console.log("\n1. Await outside async = Error:");
  console.log("   ❌ await delay(500, 'test');  // SyntaxError in regular function");
  console.log("   ✅ async function() { await delay(500, 'test'); } // OK");

  // Limitation 2: CPU-intensive tasks
  console.log("\n2. CPU-bound operations still block:");
  const start = Date.now();
  let sum = 0;
  for (let i = 0; i < 1_000_000_000; i++) {
    sum += i; // Heavy computation
  }
  console.log(`   ⚠️  Took ${Date.now() - start}ms (blocking!)`);
  console.log("   (Async doesn't help with CPU tasks)");

  // Limitation 3: Careful with forEach + await
  console.log("\n3. Incorrect loop handling:");
  const tasks = [1, 2, 3];
  
  console.log("   ❌ forEach + await (doesn't wait):");
  console.time("   forEach");
  tasks.forEach(async (task) => {
    await delay(100, task);
  });
  // forEach returns immediately, doesn't wait
  
  // Wait for forEach tasks to actually complete
  await delay(300, null);
  console.timeEnd("   forEach");

  console.log("\n   ✅ Promise.all + map (waits correctly):");
  console.time("   Promise.all");
  await Promise.all(
    tasks.map((task) => delay(100, task))
  );
  console.timeEnd("   Promise.all");
  
  // Limitation 4: Unhandled Rejections
  console.log("\n4. Unhandled Promise Rejections:");
  console.log("   ❌ const p = Promise.reject('error'); // No .catch() = crashes");
  console.log("   ✅ const p = Promise.reject('error').catch(e => console.error(e));");
  
  // Demonstration: Create rejection but handle it
  const safeRejection = Promise.reject('Example error')
    .catch(err => console.log(`   ✅ Rejection handled: "${err}"`));
}


// ============================================
// 7. PRACTICAL EXAMPLE: API CALLS
// ============================================

/*
  This example demonstrates a real-world scenario:
  - Calling multiple async operations in sequence
  - Waiting for each to complete before moving to the next
  - Proper error handling with try/catch
  - Returning data from async functions
*/

async function practicalExample() {
  console.log("\n--- Practical Example: Fetching Data ---");
  
  // These functions simulate API calls that return Promises
  async function fetchUser(userId) {
    console.log(`Fetching user ${userId}...`);
    // Uses await to pause until delay Promise resolves
    return await delay(500, { id: userId, name: `User${userId}` });
  }

  async function fetchUserPosts(userId) {
    console.log(`Fetching posts for user ${userId}...`);
    // Also uses await - waits for Promise to resolve
    return await delay(500, [
      { postId: 1, title: "Post 1" },
      { postId: 2, title: "Post 2" }
    ]);
  }

  try {
    // SEQUENTIAL: Fetch user first, THEN fetch posts
    // This is common when one operation depends on previous result
    const user = await fetchUser(1);        // Waits ~500ms
    const posts = await fetchUserPosts(user.id); // Then waits ~500ms
    // Total time: ~1000ms (sequential)
    
    console.log("\nResult:", { user, posts });
  } catch (error) {
    // Catches errors from ANY await statement above
    console.error("Failed to fetch data:", error);
  }
  
  // NOTE: For truly independent operations, use Promise.all() instead:
  // const [user, posts] = await Promise.all([
  //   fetchUser(1),
  //   fetchUserPosts(1)
  // ]);
  // This would run in parallel (~500ms instead of 1000ms)
}


// ============================================
// 8. RUNNING EXAMPLES
// ============================================

async function runAllExamples() {
  await fetchDataAsync();
  await sequentialExecution();
  await parallelExecution();
  await demonstrateBenefits();
  await demonstrateLimitations();
  await practicalExample();
}

// Uncomment to run examples
// runAllExamples().catch(console.error);


// ============================================
// SUMMARY
// ============================================

/*
  KEY DEFINITIONS:
  
  ASYNC - Operations that don't block
  - Asynchronous means non-blocking
  - Allows multiple operations to run "simultaneously"
  - Essential for servers handling thousands of requests
  
  PROMISE - Object representing a future value
  - States: Pending → Resolved/Rejected
  - Resolve: fulfill promise successfully
  - Reject: reject promise with error
  - Chained with .then() and .catch()
  
  ASYNC FUNCTION - Function that returns a Promise
  - Declared with 'async' keyword
  - Always returns a Promise
  - Can use 'await' inside
  
  AWAIT - Pause and unwrap a Promise
  - Pauses execution until Promise settles
  - Returns the resolved value
  - Can only be used in async functions
  - Throws error if Promise rejects
  
  CALLBACK - Function passed to another function
  - Executes later when operation completes
  - Old pattern (Promises/Async are better)
  - Error handling is awkward
  
  EVENT LOOP - How Node.js handles async
  - Single-threaded with event queue
  - Handles millions of operations efficiently
  - Allows one thread to serve many users
  
  TRY/CATCH - Error handling
  - try: Code that might error
  - catch: Handle error from try block
  - finally: Cleanup code
  - Works with both sync and async code
  
  PROMISE.ALL() - Wait for multiple Promises
  - Takes array of Promises
  - Resolves when ALL complete (or rejects if any fails)
  - Returns array of results in same order
  - Perfect for parallel operations
  
  PROMISE.RACE() - First Promise wins
  - Takes array of Promises
  - Resolves/Rejects with FIRST to settle
  - Ignores others after first one
  - Perfect for timeouts and first-to-finish scenarios
  
  
  HOW ASYNC/AWAIT WORKS:
  
  1. Code runs synchronously until it hits 'await'
  2. await pauses execution and returns to event loop
  3. Event loop handles other tasks while Promise settles
  4. When Promise resolves, callback queued and execution resumes
  5. Appears synchronous but is truly asynchronous
  
  
  BENEFITS OF ASYNC/AWAIT:
  
  ✅ Readability: Code reads like synchronous code
  ✅ Error Handling: Standard try/catch blocks
  ✅ Maintainability: No callback hell
  ✅ Debuggability: Better stack traces
  ✅ Performance: Non-blocking I/O operations
  ✅ Scalability: Handle 1000s of concurrent operations
  
  
  LIMITATIONS:
  
  ❌ Only for I/O operations, not CPU-bound tasks
  ❌ Can't use await outside async functions
  ❌ Must handle unhandled rejections
  ❌ Sequential awaits are slower than Promise.all()
  ❌ Careful with loops (use Promise.all() instead of forEach)
  
  
  BEST PRACTICES:
  
  1. Always wrap async code in try/catch
  2. Use Promise.all() for parallel operations
  3. Use for...of (not forEach) with await in loops
  4. Handle Promise rejections immediately
  5. Don't use await in loops unless necessary (sequential)
  6. Prefer async/await over .then() chains
  7. Return Promises from async functions for chaining
  8. Use top-level await in modules (ES2022+)
  
  
  REAL-WORLD WORKFLOW:
  
  1. Server receives 1000 requests
  2. Each request is an async operation
  3. All 1000 operations start "simultaneously"
  4. While waiting for database/API, server handles other operations
  5. As each operation completes, server sends response
  6. Results: All 1000 done in ~2 seconds (1-2s network time)
  7. Without async: Would take 1000 × 2s = 2000 seconds!
*/
