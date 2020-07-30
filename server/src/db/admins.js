import db from './';

const getAdminById = async (id) => {
  const query = 'SELECT * FROM admins WHERE id = $1';

  const result = (await db.query(query, [id])).rows[0];

  return result;
};

const getAdmin = async ({ email, username } = {}) => {
  let admin;

  if (email) {
    user = (await db.query('SELECT * FROM admins WHERE email = $1', [email]))
      .rows[0];
  }

  if (username) {
    user = (
      await db.query('SELECT * FROM admins WHERE username = $1', [username])
    ).rows[0];
  }

  return admin;
};

const addAdmin = async ({
  id,
  name,
  email,
  password,
  username,
  created_on,
  updated_on,
}) => {
  const query =
    'INSERT INTO admins ( id, name, email, password, username, created_on, updated_on ) VALUES ( $1, $2, $3, $4, $5, $6, $7 ) RETURNING id';

  const result = (
    await db.query(query, [
      id,
      name,
      email,
      password,
      username,
      created_on,
      updated_on,
    ])
  ).rows[0];

  return result;
};

const getAllUsers = async () => {
  const query = 'SELECT * FROM users';
  const result = (await db.query(query)).rows;

  return result;
};

const deleteAllUsers = async () => {
  const query = 'DELETE FROM users RETURNING *';
  const result = (await db.query(query)).rowCount;

  return result;
};

const getUserById = async (id) => {
  const query = 'SELECT * FROM users WHERE id = $1';
  const result = (await db.query(query, [id])).rows[0];
  return result;
};

const deleteUserById = async (id) => {
  const query = 'DELETE FROM users WHERE id = $1';
  const result = await db.query(query, [id]);
  return result;
};

export default {
  getAdminById,
  addAdmin,
  getAllUsers,
  deleteAllUsers,
  getUserById,
  deleteUserById,
  getAdmin,
};
