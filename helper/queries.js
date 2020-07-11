import sqltag from 'sql-template-tag';

import { pool } from '../config/pool';

const findById = async (id) => {
  const user = (
    await pool.query(
      sqltag`SELECT id, name, email, username, created_on, updated_on FROM users WHERE id = ${id}`
    )
  ).rows[0];

  return user;
};

export { findById };
