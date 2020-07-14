import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';

import { addUserToDb } from '../db/users';

const addUser = async (user) => {
  const { name, email, password, userName: username } = user;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const id = uuidv4();
    const created_on = new Date();
    const updated_on = new Date();

    const newUser = {
      id,
      name,
      email,
      password: hashedPassword,
      username,
      created_on,
      updated_on,
    };

    return await addUserToDb(newUser);
  } catch (err) {
    console.error(err.message);
  }
};

export { addUser };
