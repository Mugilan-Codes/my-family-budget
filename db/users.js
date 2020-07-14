import { pool } from '../config/pool';

const addUserToDb = async (user) => {
  const { id, name, email, password, username, created_on, updated_on } = user;

  const query =
    'INSERT INTO users (id,name,email,password,username,created_on,updated_on) VALUES ( $1, $2, $3, $4, $5, $6, $7 ) RETURNING id';

  const params = [id, name, email, password, username, created_on, updated_on];

  return await pool.query(query, params);
};

export { addUserToDb };
