## Node Version Manager - NVM

Node Version Manager (NVM) is a tool that makes it easy to install, manage, and switch between multiple versions of Node.js on the same machine. It's extremely useful when working on multiple projects that require different Node.js versions or when testing code across Node releases.

### Purpose

- Manage multiple Node.js versions side-by-side.
- Switch the active Node.js version per shell, per project, or globally.
- Install specific versions (including LTS and nightly builds) quickly.
- Keep global npm packages isolated per Node version to avoid conflicts.

### Common Commands (POSIX nvm)

- Check installed nvm version:

```bash
nvm --version
```

- Install a specific Node version:

```bash
nvm install 18.17.1    # install exact version
nvm install 18         # install latest 18.x
nvm install --lts      # install latest LTS
```

- Use (switch to) a version in the current shell:

```bash
nvm use 18
nvm use 18.17.1
```

- List installed versions:

```bash
nvm ls
```

- List remote (available) Node versions:

```bash
nvm ls-remote
```

- Set a default (alias) version used in new shells:

```bash
nvm alias default 18
```

- Uninstall a version:

```bash
nvm uninstall 16.20.0
```

- Show the currently active version:

```bash
nvm current
```

- Run a script with a specific Node version without switching shells:

```bash
nvm run 14 myscript.js
# or execute a command with a version (POSIX nvm supports `exec` in some shells):
nvm exec 14 node -v
```

### Using .nvmrc for project versions

Create a `.nvmrc` file in your project root containing the desired version (for example `18` or `lts/*`):

```
18
# or
lts/*
```

Then from the project directory:

```bash
nvm install    # if .nvmrc present, installs that version
nvm use        # uses version from .nvmrc
```

This makes switching Node versions per-project quick and reproducible.

### Tips and Best Practices

- Global npm packages are installed per Node version. If you switch Node versions you may need to reinstall global tools (or use `npm install -g` for that version).
- Use an `.nvmrc` in repositories to document the expected Node version.
- For CI, install the requested Node version (or use the CI's built-in Node version manager) to reproduce developer environments.
- Remember to restart your shell or source your profile after installing nvm so the `nvm` command is available.
