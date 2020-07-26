import db from './';

const createUser = async ({
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

const findById = async (id, password = false) => {
  let user;

  if (password) {
    user = (await db.query('SELECT * FROM users WHERE id = $1', [id])).rows[0];
  } else {
    user = (
      await db.query(
        'SELECT id, name, email, username, created_on, updated_on FROM users WHERE id = $1',
        [id]
      )
    ).rows[0];
  }

  return user;
};

const checkUser = async (id, { username, email } = {}) => {
  if (username) {
    return (
      await db.query(
        'SELECT username FROM users WHERE id != $1 AND username = $2',
        [id, username]
      )
    ).rows;
  }

  if (email) {
    return (
      await db.query('SELECT email FROM users WHERE id != $1 AND email = $2', [
        id,
        email,
      ])
    ).rows;
  }
};

const updateUser = async ({
  id,
  name,
  email,
  username,
  password,
  updated_on,
}) => {
  const query = `
    UPDATE users
    SET name = $1, email = $2, username = $3, password = $4, updated_on = $5
    WHERE id = $6
  `;

  const result = await db.query(query, [
    name,
    email,
    username,
    password,
    updated_on,
    id,
  ]);

  return result;
};

export default { createUser, findOne, findById, updateUser, checkUser };
