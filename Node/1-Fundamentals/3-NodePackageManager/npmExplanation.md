// NPM (Node Package Manager) - Complete Guide
// ===========================================

/*
NPM (Node Package Manager) is the default package manager for Node.js.
It helps developers install, manage, and share JavaScript packages and dependencies.

Official website to know about packages : https://www.npmjs.com/

WHAT IS NPM?
-----------
NPM is a command-line tool that comes bundled with Node.js. It serves as:
- A registry of JavaScript packages
- A command-line interface (CLI) for managing packages
- A way to share and distribute code

KEY CONCEPTS:
- Packages: Reusable code modules (libraries, tools, frameworks)
- Dependencies: External packages your project needs
- node_modules: Folder where packages are installed
- package.json: Project configuration and dependency manifest
- package-lock.json: Locks exact dependency versions for consistency
*/

// =============================================================================
// 1. PACKAGE.JSON - PROJECT CONFIGURATION FILE
// =============================================================================

/*
package.json is the heart of any Node.js project. It contains metadata about your project
and defines all dependencies. Here's a complete breakdown of its elements:
*/

const examplePackageJson = {
  // BASIC PROJECT INFORMATION
  "name": "my-awesome-app",           // Project name (lowercase, no spaces)
  "version": "1.0.0",                 // Current version (follows SemVer)
  "description": "A brief description of what your project does",
  "main": "index.js",                 // Entry point file
  "author": "Your Name <email@example.com>", // Project author
  "license": "MIT",                   // License type

  // DEPENDENCIES SECTION
  "dependencies": {                   // Runtime dependencies (required for app to run)
    "express": "^4.18.0",            // Web framework
    "mongoose": "^7.0.0"             // MongoDB ODM
  },

  "devDependencies": {                // Development-only dependencies
    "jest": "^29.0.0",               // Testing framework
    "nodemon": "^2.0.0"              // Auto-restart during development
  },

  "peerDependencies": {               // Expected to be installed by consumer
    "react": "^18.0.0"               // For library packages
  },

  // SCRIPTS SECTION - Custom commands you can run
  "scripts": {
    "start": "node index.js",        // Start production server
    "dev": "nodemon index.js",       // Start development server
    "test": "jest",                  // Run tests
    "build": "webpack",              // Build for production
    "lint": "eslint src/"            // Code linting
  },

  // ADDITIONAL CONFIGURATION
  "engines": {                        // Node.js version requirements
    "node": ">=16.0.0",
    "npm": ">=8.0.0"
  },

  "keywords": ["web", "api", "express"], // Keywords for npm search
  "repository": {                     // Git repository information
    "type": "git",
    "url": "https://github.com/username/repo.git"
  },

  "bugs": {                           // Issue tracker URL
    "url": "https://github.com/username/repo/issues"
  },

  "homepage": "https://myapp.com"      // Project homepage
};

/*
HOW TO CREATE package.json:
1. npm init                    - Interactive setup
2. npm init -y                - Create with defaults
3. Manual creation            - Write the file yourself

COMMON package.json FIELDS EXPLAINED:
- name: Must be unique on npm registry
- version: Follows Semantic Versioning (MAJOR.MINOR.PATCH)
- scripts: Define custom commands (run with npm run <script-name>)
- dependencies: Packages needed for your app to run
- devDependencies: Tools needed only during development
- peerDependencies: Expected to be provided by parent project
*/

// =============================================================================
// 2. NPM CONFIGURATION
// =============================================================================

/*
NPM can be configured globally or per-project. Configuration affects how npm behaves.

GLOBAL VS LOCAL INSTALLATION:
- Global (-g): Available system-wide, used for CLI tools
- Local: Project-specific, stored in node_modules

CONFIGURATION FILES:
- .npmrc: Local configuration file in your project
- ~/.npmrc: Global user configuration
- /etc/npmrc: System-wide configuration
*/

// COMMON CONFIGURATION COMMANDS:
// npm config set registry https://registry.npmjs.org/    // Set package registry
// npm config set proxy http://proxy.company.com:8080     // Set proxy
// npm config set init-author-name "Your Name"           // Default author
// npm config set init-license "MIT"                     // Default license
// npm config list                                        // View current config
// npm config delete proxy                                // Remove setting

// =============================================================================
// 3. SEMANTIC VERSIONING (SemVer) - COMPLETE GUIDE
// =============================================================================

/*
Semantic Versioning is a versioning scheme that conveys meaning about changes.
Format: MAJOR.MINOR.PATCH (e.g., 2.1.3)

VERSION COMPONENTS:
- MAJOR: Breaking changes (incompatible/non-backward compatible API changes)
- MINOR: New features/additive changes (backward compatible)
- PATCH: Bug fixes/hot fixes (backward compatible)

EXAMPLES:
- 1.0.0: Initial stable release
- 1.1.0: Added new feature (backward compatible)
- 1.1.1: Fixed a bug
- 2.0.0: Breaking change (API changed)
- 1.0.0-alpha.1: Pre-release version
- 1.0.0-rc.1: Release candidate

VERSION RANGES AND MODIFIERS:
NPM supports various ways to specify acceptable version ranges:
*/

// EXACT VERSION
"1.2.3"        // Exactly version 1.2.3

// CARET (^) - ONLY ALLOWS MINOR UPDATES; DEFAULT FOR MOST PACKAGES
"^1.2.3"       // Compatible with 1.x.x (allows minor and patch updates)
"^0.2.3"       // Compatible with 0.2.x (for pre-1.0, stricter)
"^0.0.3"       // Compatible with 0.0.3 (exact for pre-1.0 pre-minor)

// TILDE (~) - UPDATE LATEST PATCH VERSION
"~1.2.3"       // Compatible with 1.2.x (allows patch updates only)
"~1.2"         // Same as ~1.2.0
"~1"           // Same as ~1.0.0

// COMPARISON OPERATORS
">1.2.3"       // Greater than 1.2.3
">=1.2.3"      // Greater than or equal to 1.2.3
"<1.2.3"       // Less than 1.2.3
"<=1.2.3"      // Less than or equal to 1.2.3

// HYPHEN RANGES
"1.2.3 - 2.3.4"  // Between 1.2.3 and 2.3.4 (inclusive)

// X-RANGES (wildcards)
"1.x"          // Any 1.x.x version
"1.2.x"        // Any 1.2.x version
"*"            // Any version
""             // Same as *

// SPECIAL KEYWORDS
"latest"       // Latest stable version
"next"         // Latest pre-release
"beta"         // Latest beta version

// COMBINED RANGES
">=1.2.3 <2.0.0"  // Between 1.2.3 and 2.0.0

/*
WHEN TO USE EACH RANGE:
- ^ (caret): Most common, allows safe updates within major version
- ~ (tilde): Conservative, only patch updates for stability
- Exact: For critical dependencies where you need precise control
- >, <, etc.: For specific version requirements
*/

// =============================================================================
// 4. HOW NPM MANAGES DEPENDENCIES AND SemVer
// =============================================================================

/*
NPM uses SemVer to resolve and install package versions. Here's how it works:

1. DEPENDENCY RESOLUTION:
   - Reads package.json dependencies
   - Finds compatible versions from npm registry
   - Resolves dependency trees (handles nested dependencies)

2. VERSION LOCKING:
   - package-lock.json ensures exact same versions across environments
   - Prevents "works on my machine" issues
   - Speeds up installs

3. UPDATE BEHAVIOR:
   - npm install: Installs based on package.json ranges
   - npm update: Updates within SemVer ranges
   - npm install <package>@latest: Forces latest version

4. CONFLICT RESOLUTION:
   - NPM flattens dependency tree when possible
   - Uses package-lock.json to resolve conflicts
   - May create duplicate packages if conflicts can't be resolved
*/

// EXAMPLE: How version ranges work in practice
const dependencyExamples = {
  "express": "^4.18.0",    // Will install 4.18.x or 4.x.x, but not 5.x.x
  "lodash": "~4.17.0",     // Will install 4.17.x, but not 4.18.x
  "axios": "0.27.2",       // Will install exactly 0.27.2
  "react": ">=17.0.0 <18.0.0"  // Between 17.0.0 and 18.0.0
};

// =============================================================================
// 5. NPM COMMANDS AND WORKFLOW
// =============================================================================

/*
ESSENTIAL NPM COMMANDS:

PROJECT SETUP:
npm init              # Create package.json interactively
npm init -y          # Create package.json with defaults

PACKAGE INSTALLATION:
npm install <package>           # Install and save to dependencies
npm install <package> --save-dev # Install as dev dependency
npm install                    # Install all dependencies from package.json
npm install --production       # Install only production dependencies

UPDATES AND MAINTENANCE:
npm update                     # Update packages within SemVer ranges
npm update <package>           # Update specific package
npm outdated                   # Check for outdated packages
npm audit                      # Check for security vulnerabilities
npm audit fix                  # Fix security issues automatically

SCRIPTS AND RUNNING:
npm run <script>               # Run custom script from package.json
npm start                      # Run start script (common shortcut)
npm test                       # Run test script (common shortcut)
npm run build                  # Run build script

INSPECTION:
npm list                       # Show installed packages
npm list --depth=0             # Show only top-level packages
npm info <package>             # Get package information
npm search <term>              # Search for packages

REMOVAL:
npm uninstall <package>        # Remove package
npm uninstall <package> --save-dev  # Remove dev dependency

PUBLISHING:
npm login                      # Authenticate with npm registry
npm publish                    # Publish your package
npm version patch              # Bump patch version
npm version minor              # Bump minor version
npm version major              # Bump major version
*/

// TYPICAL NPM WORKFLOW:
/*
1. Initialize project: npm init -y
2. Install dependencies: npm install express mongoose
3. Install dev tools: npm install --save-dev jest nodemon
4. Define scripts in package.json
5. Run development: npm run dev
6. Run tests: npm test
7. Check security: npm audit
8. Update dependencies: npm update
9. Deploy: npm run build
*/

// =============================================================================
// 6. NPM BEST PRACTICES
// =============================================================================

/*
DEPENDENCY MANAGEMENT:
- Use ^ for most dependencies (safe updates)
- Use ~ for libraries with frequent patches
- Use exact versions for critical infrastructure
- Regularly audit for security vulnerabilities
- Keep dependencies updated but not bleeding-edge

PACKAGE.JSON ORGANIZATION:
- Group related scripts logically
- Use descriptive script names
- Include all necessary metadata
- Specify Node.js version requirements

SECURITY:
- Run npm audit regularly
- Use npm audit fix for automatic fixes
- Be cautious with unknown packages
- Check package maintainers and download counts

PERFORMANCE:
- Use package-lock.json for consistent installs
- Consider using npm ci in CI/CD for faster installs
- Clean node_modules occasionally: rm -rf node_modules && npm install
*/

// =============================================================================
// 7. TROUBLESHOOTING COMMON ISSUES
// =============================================================================

/*
COMMON PROBLEMS AND SOLUTIONS:

1. "npm install" fails:
   - Clear cache: npm cache clean --force
   - Delete node_modules: rm -rf node_modules
   - Reinstall: npm install

2. Permission errors:
   - Use npx instead of global installs
   - Fix permissions: sudo chown -R $(whoami) ~/.npm

3. Package not found:
   - Check spelling
   - Verify package exists: npm info <package>
   - Check registry: npm config get registry

4. Version conflicts:
   - Check package-lock.json
   - Use npm ls to see dependency tree
   - Consider using resolutions in package.json

5. Scripts not working:
   - Check script exists in package.json
   - Use npm run <script> for custom scripts
   - Verify file paths are correct
*/

console.log("NPM Guide loaded successfully!");
