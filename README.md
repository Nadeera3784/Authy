
## Authy

Authy is an application  that has JWT based authentication system. it supports social login(Google, Facebook).

## Features

- Login
- Registration
- Social Login
- Email notification


## Tech

- [NestJS] - duh
- [Redis] - cache & queues 
- [postgres] - database


## Installation

```bash
$ npm install
```

## Running the app

Copy the example env file and make the required configuration changes in the .env file
cp .env.example .env

```bash
#run the database migrations and seeds 
$ npx prisma migrate deploy
$ npx prisma db seed

# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
## License

Nest is [MIT licensed](LICENSE).
