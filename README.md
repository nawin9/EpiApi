# EpiApi

API server in Node + Koa v2 + Mongodb

Game server in SocketIO v2

## Getting started

Clone the project

`$ git clone https://github.com/nawin9/EpiApi`

`$ cd EpiApi`

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
*   [x] Installing Socket IO v2
*   [ ] Socket events
*   [x] Dockerization
*   [ ] Unit tests
*   [ ] Deployment
*   [ ] CI / CD
