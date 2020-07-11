import sqltag from 'sql-template-tag';

import { pool } from '../config/pool';

const findById = async (id, passowrd = false) => {
  let user;

  if (passowrd) {
    user = (await pool.query(sqltag`SELECT * FROM users WHERE id = ${id}`))
      .rows[0];
  } else {
    user = (
      await pool.query(
        sqltag`SELECT id, name, email, username, created_on, updated_on FROM users WHERE id = ${id}`
      )
    ).rows[0];
  }

  return user;
};

const findByEmail = async (email, password = false) => {
  let user;

  if (password) {
    user = (
      await pool.query(sqltag`SELECT * FROM users WHERE email = ${email}`)
    ).rows[0];
  } else {
    user = (
      await pool.query(
        sqltag`SELECT id, name, email, username, created_on, updated_on FROM users WHERE email = ${email}`
      )
    ).rows[0];
  }

  return user;
};

const findByUsername = async (username, password = false) => {
  let user;
  if (password) {
    user = (
      await pool.query(sqltag`SELECT * FROM users WHERE username = ${username}`)
    ).rows[0];
  } else {
    user = (
      await pool.query(
        sqltag`SELECT id, name, email, username, created_on, updated_on FROM users WHERE username = ${username}`
      )
    ).rows[0];
  }

  return user;
};

export { findById, findByEmail, findByUsername };
