/*
  Node.js Notes

  WHAT IS NODE.JS?
  ----------------
  - Node.js is a JavaScript runtime built on Chrome's V8 engine.
  - It allows you to run JavaScript outside the browser (server-side).
  - It provides built-in modules for file I/O, networking, streams, and more.
  - It uses an event-driven, non-blocking I/O model (event loop) for high concurrency.

  FEATURES:
  ---------
  - Asynchronous and event-driven: 
   Just like a waiter taking orders at a restaurant, Node.js can handle multiple requests.
   Waiter takes an order, gives it to the kitchen, and moves on to the next customer.
   When the food is prepared an event is triggered by the kitchen staff and waiter delivers it to the customer.

   It never waits for an operation to complete; instead, it uses callbacks, promises, or async/await
   to handle results when they are ready. This makes it ideal for real-time applications, APIs, and microservices.
  
  - Single-threaded with event loop: Handles many connections efficiently.
   Node.js is Single-Threaded. There is only one waiter for the entire restaurant, meaning it uses single CPU for multiple concurrent operations.
   The Event Loop keeps the waiter moving to pour water for Table 2, then clear plates from Table 3.
   When the kitchen rings the bell, the Event Loop directs the waiter back to deliver the steak.
   The event loop makes that single waiter run thoughout the restaurant taking, assigning orders and delivering it.

  - Rich ecosystem: npm provides thousands of libraries and tools.
    npm (Node Package Manager) is like a giant supermarket for JavaScript tools and libraries.
    You can find packages for everything from web frameworks (Express) to database clients (Mongoose) to utility libraries (Lodash).
    This ecosystem allows developers to build complex applications quickly by leveraging existing code.

  - Cross-platform: Runs on Windows, macOS, Linux, and more.
    This means you can develop and deploy Node.js applications on a wide variety of operating systems without worrying about compatibility issues.
  
  WHY NODE.JS EXISTS
  ------------------
  - JavaScript was originally browser-only. Node.js enables JavaScript on the server.
  - It enables full-stack JavaScript (same language on server and client).
  - Non-blocking I/O makes it efficient for real-time apps, APIs, and microservices.
  - Large ecosystem (npm) provides libraries for almost anything.

  WHEN TO USE NODE.JS
  ------------------
  - Real-time applications (chat, gaming, collaboration tools).
  - APIs and microservices (especially when handling many concurrent requests).
  - JSON APIs (Node.js works well with JSON, which is common in web APIs).
  - Server-side rendering for web applications (e.g., with frameworks like Next.js).
  - Timers and scheduled tasks (e.g., using setTimeout, setInterval, or libraries like node-cron).
  - Event driven applications (e.g., IoT, message queues, or any app that benefits from an event-driven architecture).
  
  JAVASCRIPT ENGINES IN DIFFERENT BROWSERS AND RUNTIMES
  ---------------------------------------------------
  Different browsers use different JavaScript engines, and some of these engines
  are used in server-side JavaScript runtimes for Node.js-like applications:

  - Chrome/Edge (Chromium-based): V8 engine
    → Used in Node.js (primary runtime)
    → Also used in Deno (alternative runtime)

  - Safari: JavaScriptCore engine
    → Used in Bun (fast alternative runtime with built-in bundler)

  - Firefox: SpiderMonkey engine
    → Primarily browser-only, though there are experimental server-side projects
    → Not commonly used for production Node.js alternatives

  While Node.js specifically uses V8, other runtimes leverage different browser
  engines to provide alternative approaches to server-side JavaScript execution.


  INSTALLING NODE.JS (3 WAYS)
  --------------------------
  1) Official installer / package (Linux + Windows)
     - Linux: Use distro packages (apt, yum, pacman) or download tarballs from nodejs.org.
     - Windows: Download and run the .msi installer from nodejs.org.

     Example (Ubuntu):
       curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
       sudo apt-get install -y nodejs

  2) Package managers (Linux + Windows)
     - Linux: `apt`, `yum`, `dnf`, `pacman` (may have older versions).
     - Windows: `choco install nodejs` (Chocolatey) or `scoop install nodejs`.

  3) Node Version Manager (nvm) - recommended for developers
     - nvm lets you install and switch between multiple Node.js versions.
     - Useful when different projects require different Node versions.

     Install nvm (Linux/macOS):
       curl -fsSL https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.6/install.sh | bash
       # then restart shell or run:
       source ~/.nvm/nvm.sh

     Install nvm (Windows):
       # Use nvm-windows (different project):
       https://github.com/coreybutler/nvm-windows/releases
       # Download and run the installer (nvm-setup.exe)

     Using nvm:
       nvm install 20            # install Node 20
       nvm use 20                # switch to Node 20
       nvm ls                    # list installed versions
       nvm alias default 20      # set default version

  USING NODE.JS
  -------------
  - Run JavaScript files:
      node script.js
  - Start an interactive REPL (read-eval-print loop):
      node
  - Check versions:
      node -v          # Node version
      npm -v           # npm version (installed with Node)
  - Use built-in modules without installing anything:
      const fs = require('fs');
      const http = require('http');
  - Common task: create a simple HTTP server:
      const http = require('http');
      const server = http.createServer((req, res) => {
        res.end('Hello from Node!');
      });
      server.listen(3000);

  WHY USE NVM?
  ------------
  - Different projects often require different Node.js versions.
  - nvm makes switching versions easy without reinstalling.
  - It keeps each version isolated (no global conflicts).

  HOW NVM MANAGES NODE VERSIONS
  -----------------------------
  - nvm installs Node versions into a central directory (e.g., ~/.nvm/versions/node).
  - Each version has its own node/npm binaries.
  - When you run `nvm use X`, nvm updates your shell PATH to point to that version.
  - This makes `node`, `npm`, and `npx` run the selected version.

  USEFUL NVM COMMANDS
  -------------------
  nvm install 20            # Install Node 20
  nvm use 20                # Switch to Node 20 in current shell
  nvm alias default 20      # Set default version for new shells
  nvm ls                    # List installed versions
  nvm ls-remote             # List available versions
  nvm uninstall 20          # Remove a version

  EXTRA NOTES
  -----------
  - On Windows, use nvm-windows (different project) because the original nvm is Unix-only.
  - Keep your global npm installs minimal; use per-project dependencies (package.json).
  - When using nvm, open a new terminal after installing or run `source ~/.nvm/nvm.sh`.
*/
