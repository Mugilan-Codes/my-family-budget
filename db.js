import { pool } from './pool';
import { db_name } from './env';
import sqltag from 'sql-template-tag';

pool.on('connect', () => {
  console.log(`Connected to ${db_name} DB`);
});

const createUserTable = async () => {
  const sqlQuery = `CREATE TABLE IF NOT EXISTS users
      (
        id UUID PRIMARY KEY,
        name VARCHAR(30) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(30) NOT NULL,
        username VARCHAR(50) UNIQUE,
        created_on TIMESTAMPTZ NOT NULL,
        updated_on TIMESTAMPTZ NOT NULL
      )`;
  try {
    await pool.query(sqlQuery);

    console.log('User Table Created');
    pool.end();
  } catch (err) {
    console.error(err.message);
    pool.end();
  }
};

const dropUserTable = async () => {
  const sqlQuery = `DROP TABLE IF EXISTS users`;
  try {
    await pool.query(sqlQuery);

    console.log('User Table Dropped');
    pool.end();
  } catch (err) {
    console.error(err.message);
    pool.end();
  }
};

const createAllTables = () => {
  createUserTable();
};

const dropAllTables = () => {
  dropUserTable();
};

pool.on('remove', () => {
  console.log('Connection Ended');
  process.exit(0);
});

export { createAllTables, dropAllTables };
