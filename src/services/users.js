import { v4 as uuidv4 } from 'uuid';
import { addUserToDb } from '../db/users';

const addUser = async ({ name, email, password, username }) => {
  try {
    const id = uuidv4();
    const created_on = new Date();
    const updated_on = new Date();

    if (!username) username = null;

    let newUser = {
      id,
      name,
      email,
      password,
      username,
      created_on,
      updated_on,
    };

    console.log(newUser);

    const result = await addUserToDb(newUser);

    console.log(result);

    return result;
  } catch (err) {
    console.log(err.message);
    return Error(err);
  }
};

export { addUser };
