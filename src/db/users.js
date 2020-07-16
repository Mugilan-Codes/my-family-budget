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

export { addUserToDb };
