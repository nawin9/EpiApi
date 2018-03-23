# EpiApi

API server in Node + Koa + Mongodb

## Getting started

Clone the project

`$git clone https://github.com/DuPayratBenoit/HorseJS-server`

`$cd HorseJS-server`

**NOTE:** Install and run a mongo server before starting the server.

## Useful commands

| Commands                  | NPM             | YARN           |
| ------------------------- | --------------- | -------------- |
| Install                   | `npm install`   | `yarn install` |
| Start a dev server        | `npm run dev`   | `yarn dev`     |
| Build a server            | `npm run build` | `yarn build`   |
| Start a production server | `npm start`     | `yarn start`   |

## Current routes

The dev server is running at localhost:3000

Register:
[http://localhost:3000/register](http://localhost:3000/register)

Login:
[http://localhost:3000/login](http://localhost:3000/login)

Swagger:
[http://localhost:3000/swagger](http://localhost:3000/swagger)

## TODOs

*   [x] Start the project with koa
*   [x] Connection with mongodb
*   [x] Authentication with JWT
*   [x] Swagger Doc
*   [ ] Necessary routes
*   [x] Socket IO v2
*   [ ] Dockerization
*   [ ] Unit tests
