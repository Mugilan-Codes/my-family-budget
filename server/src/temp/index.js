//! Temporary way to create table creation until docker is integrated

import { Pool } from 'pg';

import { db_url } from '../config';

const pool = new Pool({ connectionString: db_url });

pool.on('connect', () => {
  console.log(`Connected to DB`);
});

const createUsersTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS users
    (
      id UUID PRIMARY KEY,
      name VARCHAR(30) NOT NULL,
      email VARCHAR(50) UNIQUE NOT NULL,
      password VARCHAR(100) NOT NULL,
      username VARCHAR(30) UNIQUE,
      created_on TIMESTAMPTZ NOT NULL,
      updated_on TIMESTAMPTZ NOT NULL
    )
  `;
  try {
    await pool.query(query);
    console.log("Table 'users' Created");
    pool.end();
  } catch (err) {
    console.error(err.message);
    pool.end();
  }
};

const dropUsersTable = async () => {
  const query = `DROP TABLE IF EXISTS users`;
  try {
    await pool.query(query);
    console.log("Table 'users' Dropped");
    pool.end();
  } catch (err) {
    console.error(err.message);
    pool.end();
  }
};

const createAllTables = async () => {
  createUsersTable();
};

const dropAllTables = async () => {
  dropUsersTable();
};

pool.on('remove', () => {
  console.log('Connection Ended');
  process.exit(0);
});

export { createAllTables, dropAllTables };

require('make-runnable');
