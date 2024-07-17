# README

My Express starter project.
This simple API handles a list of motorbikes for rent.

## Table of Content

<!-- toc -->

- [How to run](#how-to-run)
- [Project structure](#project-structure)

<!-- tocstop -->

## How to run

Make sure to have the dependencies installed:

```bash
npm install
```

A `.env` file can be created at the project root with the following content:

```sh
#.env

PORT=<port-for-the-app>
```

For a development environment, simply run the command:

```bash
npm run server-dev
```

During development deployment, APIs can be referred at the route `/doc`

## Project structure

```markdown
__ src/
|____ index.js ........................... Application entry
|____ app.js ........................... Application configs
|____ routes/ ...................................... Routers
|____ controllers/ ............................. Controllers
|____ services/ ................................... Services
|____ dtos/ ........................................... DTOs
|____ types/ ......................................... Types
|____ interfaces/ ............................... Interfaces
|
|_ tests/ ...................................... Tests setup
|_ docs/ .................................... Documentations
|_ data/ .................................. Mock data folder
|_ package.json ............................ Project configs
|_ eslint.config.mjs ........................ Linter configs
|_ .prettier.json ........................ Formatter configs
|_ .editorconfig ............... Cross-editor format configs
```
