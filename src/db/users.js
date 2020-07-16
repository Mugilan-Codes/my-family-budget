import db from './';

const addUserToDb = async ({
  id,
  name,
  email,
  password,
  username,
  created_on,
  updated_on,
}) => {
  const query =
    'INSERT INTO users (id, name, email, password, username, created_on, updated_on) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING id';

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

const findOne = async ({ email, username } = {}) => {
  let user;

  if (email) {
    user = (await db.query('SELECT * FROM users WHERE email = $1', [email]))
      .rows[0];
  }
  if (username) {
    user = (
      await db.query('SELECT * FROM users WHERE username = $1', [username])
    ).rows[0];
  }

  return user;
};

const findById = async (id) => {
  let user;

  user = (
    await db.query(
      'SELECT id, name, email, username, created_on, updated_on FROM users WHERE id = $1',
      [id]
    )
  ).rows[0];

  return user;
};

export { addUserToDb, findOne, findById };
