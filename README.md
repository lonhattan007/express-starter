# README

My Express starter project.
This simple API handles a list of motorbikes for rent.

## Table of content

<!-- toc -->

- [README](#readme)
  - [Table of content](#table-of-content)
  - [How to run](#how-to-run)
  - [Project structure](#project-structure)
  - [Naming conventions](#naming-conventions)

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

During development deployment, APIs can be referred at the route `<hostname>:<PORT>/docs`

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
|____ constants/ .......................... Common constants
|
|_ tests/ ...................................... Tests setup
|_ docs/ .................................... Documentations
|_ data/ .................................. Mock data folder
|_ package.json ............................ Project configs
|_ eslint.config.mjs ........................ Linter configs
|_ .prettier.json ........................ Formatter configs
|_ .editorconfig ............... Cross-editor format configs
```

## Naming conventions

Since the project uses Typescript, we follow Typescript naming conventions:

- Variables should be in camel case, e.g. _bikeToAdd_
- Local constants should also be in camel case.
- Global constants, should be in screaming snake case: _DEFAULT_PAGE_SIZE_
- Functions should be in camel case, e.g. _getInstance()_
- Classes should be in Pascal case, e.g. _BikeService_
- Interfaces should be in Pascal case
- Types should be in Pascal case
- Enums and their elements should be in Pascal case
- Source code file names should be in the format `<domain>.<component>.ts`:
  - `<domain>` is the domain that the module works on, for example `user` or `bike`
  - `<component>` is the type of component of the module, e.g. `controller`, `service`
  - Exception for router files: they should be the name of the route, e.g: `bikes.ts` for `/bikes`, `docs.ts` for `/docs`
  - TBA
