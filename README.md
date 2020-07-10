# my-family-budget

Keep track of all family budget

## TODO:

1. Complete Backend
   1. setup database - postgres
   1. create schema
   1. create routes
1. Complete Frontend (React/Vue or React Native)

## Instruction

- Postgres Setup
  - [MacOS](https://www.robinwieruch.de/postgres-sql-macos-setup)
  - [Windows](https://www.robinwieruch.de/postgres-sql-windows-setup)

## Packages Used

> Dependency

- [dotenv](https://www.npmjs.com/package/dotenv)
- [express](https://www.npmjs.com/package/express)
- [pg](https://www.npmjs.com/package/pg)
- [sql-template-tag](https://www.npmjs.com/package/sql-template-tag)
- [cors](https://www.npmjs.com/package/cors)
- [express-validator](https://www.npmjs.com/package/express-validator)
- [bcrypt](https://www.npmjs.com/package/bcrypt)

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
- [Building RESTful Api With Node.js, Express.Js And PostgreSQL the Right way](https://itnext.io/building-restful-api-with-node-js-express-js-and-postgresql-the-right-way-b2e718ad1c66)
- [Building a full stack MongoDB/PostgreSQL, Express, React, Node (MERN/PERN) app with CI/CD pipeline using Docker, Docker-Compose, Kubernetes, Helm, Google Cloud Platform (GCP) and Gitlab CI/CD Part 1](https://medium.com/@j.jameslee02102/building-a-full-stack-mongodb-postgresql-express-react-node-mern-pern-app-with-ci-cd-pipeline-5cb3d0a733e8)
- [Setting up a RESTful API with Node.js and PostgreSQL](https://blog.logrocket.com/setting-up-a-restful-api-with-node-js-and-postgresql-d96d6fc892d8/)
- [PostgreSQL Schema Management Basics](https://severalnines.com/blog/postgresql-schema-management-basics)
- [How To Set Up An Express API Backend Project With PostgreSQL](https://www.smashingmagazine.com/2020/04/express-api-backend-project-postgresql/)
- [Bulletproof node.js project architecture ](https://softwareontheroad.com/ideal-nodejs-project-structure/)
