import { v4 as uuidv4 } from 'uuid';

import { addUserToDb, findOne, findById } from '../db/users';
import { hashPassword } from '../utils/crypt';

const addUser = async ({ name, email, password, username }) => {
  try {
    let user = await findOne({ email });
    if (user) {
      return { err_msg: 'Email already exists' };
    }

    if (!username) username = null;

    user = await findOne({ username });
    if (user) {
      return { err_msg: 'Username already exists' };
    }

    const id = uuidv4();
    const created_on = new Date();
    const updated_on = new Date();

    password = await hashPassword(password);

    let newUser = {
      id,
      name,
      email,
      password,
      username,
      created_on,
      updated_on,
    };

    return await addUserToDb(newUser);
  } catch (err) {
    console.log(err.message);
    return new Error(err);
  }
};

const retrieveUser = async (id) => {
  try {
    return await findById(id);
  } catch (err) {
    console.log(err.message);
    return new Error(err);
  }
};

export { addUser, retrieveUser };
