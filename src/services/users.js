import { v4 as uuidv4 } from 'uuid';

const addUser = ({ name, email, password, username }) => {
  try {
    const id = uuidv4();
    const created_on = new Date();
    const updated_on = new Date();

    // if (!username) username = null;
    username = !username && null;

    let newUser = {
      name,
      email,
      password,
      username,
      id,
      created_on,
      updated_on,
    };

    console.log(newUser);

    return newUser;
  } catch (err) {
    console.log(err.message);
    return Error(err);
  }
};

export { addUser };
