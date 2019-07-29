# File mapper api

> Node.js Express API with TypeScript 3. Supports MongoDB

## Description
This project aims to transform excel/csv files via defined schemas.Supports column mapping,value extraction(regex),value replacement,skipping specific values 

## Features
##### Framework
- Nodejs
- Typescript
##### Web Framework
- Express
##### Authentication
- Jwt authentication
##### Session Storage
- MongoDB
##### Session Storage ORM
- Mongoose
##### Integration testing
- Jest
- Chai
- Chai-http
##### Validation
- Joi
##### Code analysis 
- Ts-lint
- Prettier


## Requirements

- node >= 10
- npm >= 6
- mongodb >= 3.0
- typescript >= 3.0

## App skeleton
```
.
├── LICENSE
├── README.md
├── Dockerfile
├── docker-compose.yml
├── nodemon.json
├── package.json
├── jest.config.js
├── tsconfig.json
├── tslint.json
├── src
│   ├── components
│   │   ├── SampleComponent
│   │   │   ├── index.ts
│   │   │   ├── controller.ts
│   │   │   ├── model.ts
│   │   │   ├── routing.ts
│   │   │   ├── service.ts
│   │   │   └── service.spec.ts
│   │   ├── index.ts
│   ├── config
│   │   ├── connection
│   │   │   └── connection.ts
│   │   ├── env
│   │   │   └── index.ts
│   ├── types
│   │   ├── endpoint.ts
│   │   ├── app-error.ts
│   │   ├── error-formatter.ts
│   │   ├── http-status-codes.ts
│   │   └── logger
│   └── middlewares
│       ├── authentication.ts
│       ├── cors.ts
│       ├── error.ts
│       ├── notfound.ts
│       ├── request-response-logger.ts
│       ├── validation.ts
│       └── index.ts

## Running the API
### Development
To start the application in development mode, run:

```bash
npm install -g nodemon
npm install -g ts-node
npm install -g typescript
npm install
```

Start the application in dev env:
```
npm run start-dev
```
Express server listening on http://localhost:3000/, in development mode
The developer mode will watch your changes then will transpile the TypeScript code and re-run the node application automatically.

Start dockerised app:
```
scripts/app_spin_up.sh
```

Start dockerised db:
```
scripts/mongo_spin_up.sh
```

### Testing
To run integration tests: 
```bash
npm run test-integration
```
To run unit tests: 
```bash
npm run test-unit
```

## Set up environment
In root folder you can find `.env`. You can use this config or change it for your purposes.
If you want to add some new variables, you also need to add them to interface and config object (Look `src/config/index.ts`)

## Swagger
```bash
npm run swagger
```
Swagger documentation will be available on route: 
```bash
http://localhost:3000/swagger
```
