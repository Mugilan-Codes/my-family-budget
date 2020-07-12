import sqltag from 'sql-template-tag';

import { pool } from '../config/pool';

/**
 ** Function to find the user in the users table
 * @param {Object}  params            Select what you want to check eg. {id: id}
 * @param {Boolean} [passowrd=false]  Pass true to return user with password
 */
const findOne = async ({ id, email, username } = {}, passowrd = false) => {
  let user;

  if (passowrd) {
    if (id) {
      user = (await pool.query(sqltag`SELECT * FROM users WHERE id = ${id}`))
        .rows[0];
    } else if (email) {
      user = (
        await pool.query(sqltag`SELECT * FROM users WHERE email = ${email}`)
      ).rows[0];
    } else if (username) {
      user = (
        await pool.query(
          sqltag`SELECT * FROM users WHERE username = ${username}`
        )
      ).rows[0];
    }
  } else {
    if (id) {
      user = (
        await pool.query(
          sqltag`SELECT id, name, email, username, created_on, updated_on FROM users WHERE id = ${id}`
        )
      ).rows[0];
    } else if (email) {
      user = (
        await pool.query(
          sqltag`SELECT id, name, email, username, created_on, updated_on FROM users WHERE email = ${email}`
        )
      ).rows[0];
    } else if (username) {
      user = (
        await pool.query(
          sqltag`SELECT id, name, email, username, created_on, updated_on FROM users WHERE username = ${username}`
        )
      ).rows[0];
    }
  }

  return user;
};

export { findOne };
