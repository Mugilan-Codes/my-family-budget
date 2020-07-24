import { v4 as uuidv4 } from 'uuid';

import User from '../db/users';
import { hashPassword, comparePassword } from '../utils/crypt';

const addUser = async ({ name, email, password, username }) => {
  try {
    let user = await User.findOne({ email });
    if (user) {
      return { err_msg: 'Email already exists' };
    }

    user = await User.findOne({ username });
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

    return await User.createUser(newUser);
  } catch (err) {
    console.log(err.message);
    return new Error(err);
  }
};

const retrieveUser = async ({ id, email, username } = {}) => {
  let user;
  try {
    if (id) {
      user = await User.findById(id);
    } else {
      user = await User.findOne({ email });
      if (!user) {
        user = await User.findOne({ username });
        if (!user) {
          return { err_msg: 'Invalid Credentials' };
        }
      }
    }
    return user;
  } catch (err) {
    console.log(err.message);
    return new Error(err);
  }
};

const updateUser = async ({ id, name, email, username, password }) => {
  console.log({ id, name, email, username, password });
  try {
    let user = await User.findById(id, true);

    console.log({ user });

    name = name === null ? user.name : name;
    // name = name || user.name;
    email = email === null ? user.email : email;
    username = username === null ? user.username : username;

    if (password) {
      const isMatch = await comparePassword(password, user.password);
      if (!isMatch) {
        password = password;
      } else {
        password = user.password;
      }
    } else {
      password = user.password;
    }

    password = await hashPassword(password);

    const updated_on = new Date();

    let updateUserInfo = {
      id,
      name,
      email,
      username,
      password,
      updated_on,
    };

    console.log({ updateUserInfo });

    return await User.updateUser(updateUserInfo);
  } catch (err) {
    console.log(err.message);
    return new Error(err);
  }
};

export { addUser, retrieveUser, updateUser };
