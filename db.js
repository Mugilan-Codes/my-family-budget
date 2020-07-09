import { pool } from './pool';
import { db_name } from './env';

pool.on('connect', () => {
  console.log(`Connected to ${db_name} DB`);
});

const createUserTable = async () => {
  const sqlQuery = `CREATE TABLE IF NOT EXISTS users
      (
        id uuid PRIMARY KEY,
        name varchar(30),
        email varchar(100) UNIQUE NOT NULL
      )`;
  try {
    const res = await pool.query(sqlQuery);

    console.log(res);
    pool.end();
  } catch (err) {
    console.error(err.message);
    pool.end();
  }
};

const dropUserTable = async () => {
  const sqlQuery = `DROP TABLE IF EXISTS users`;
  try {
    const res = await pool.query(sqlQuery);

    console.log(res);
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
