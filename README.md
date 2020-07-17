# my-family-budget

Keep track of all family budget

## TODO:

1. Use config and dotenv together to provide fallbacks and understanding
1. Complete the routes
1. Refactor Backend

## Instruction

- Postgres Setup
  - [MacOS](https://www.robinwieruch.de/postgres-sql-macos-setup)
  - [Windows](https://www.robinwieruch.de/postgres-sql-windows-setup)

## Packages Used

> Dependency

- [dotenv](https://www.npmjs.com/package/dotenv)
- [express](https://www.npmjs.com/package/express)
- [pg](https://www.npmjs.com/package/pg)
- [cors](https://www.npmjs.com/package/cors)
- [express-validator](https://www.npmjs.com/package/express-validator)!
- [bcrypt](https://www.npmjs.com/package/bcrypt)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- [uuid](https://www.npmjs.com/package/uuid)
- [celebrate](https://www.npmjs.com/package/celebrate)

> Dev Dependency

- [nodemon](https://www.npmjs.com/package/nodemon)
- [@babel/core](https://www.npmjs.com/package/@babel/core)
- [@babel/node](https://www.npmjs.com/package/@babel/node)
- [@babel/preset-env](https://www.npmjs.com/package/@babel/preset-env)
- [make-runnable](https://www.npmjs.com/package/make-runnable)
- [npm-run-all](https://www.npmjs.com/package/npm-run-all)

## Scripts Explanation

- Creates all the tables

```zsh
   npm run create-dev-tables
```

- Drops all the tables

```zsh
   npm run drop-dev-tables
```

- Creates all tables and Starts the server Parallelly

```zsh
   npm run setup
```

- First Drops All Tables and then Creates All the Tables

```zsh
   npm run setup:recreate
```

- Starts the server with nodemon

```zsh
   npm start
```

## Resources

- [PostgreSQL Official Website](https://www.postgresql.org/)
- [Node-Postgres](https://node-postgres.com/)
- [JOI Validation Module](https://hapi.dev/module/joi/)
- [Docker Hub](https://hub.docker.com/)
- [Bulletproof node.js project architecture ](https://softwareontheroad.com/ideal-nodejs-project-structure/)
- [Using Docker & Docker Compose To Improve Your Full Stack Application Development](https://medium.com/@paigen11/using-docker-docker-compose-to-improve-your-full-stack-application-development-1e41280748f4)
- [Error handling in Express using Middleware](https://codeforgeek.com/error-handling-in-express-using-middleware/)
