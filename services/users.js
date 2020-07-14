import { addUserToDb } from '../db/users';

const addUser = async (user) => {
  const {
    id,
    name,
    email,
    hashedPassword: password,
    userName: username,
    c_on: created_on,
    u_on: updated_on,
  } = user;
  const newUser = {
    id,
    name,
    email,
    password,
    username,
    created_on,
    updated_on,
  };
  try {
    return await addUserToDb(newUser);
  } catch (err) {
    console.error(err.message);
  }
};

export { addUser };
