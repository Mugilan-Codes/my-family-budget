import { v4 as uuidv4 } from 'uuid';

import User from '../db/users';
import { hashPassword, comparePassword } from '../utils/crypt';

const registerUserService = async ({ name, email, password, username }) => {
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
    console.log('registerUserService');
    console.error(err.message);
    return new Error(err);
  }
};

const getUserService = async ({ id, email, username } = {}) => {
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
    console.log('getUserService');
    console.error(err.message);
    return new Error(err);
  }
};

const updateUserService = async ({ id, name, email, username, password }) => {
  try {
    let user = await User.findById(id, true);

    name = name === null ? user.name : name;
    email = email === null ? user.email : email;
    username = username === null ? user.username : username;

    let checkUser = await User.checkUser(id, { email });
    if (checkUser.length > 0) {
      return { err_msg: 'Email already taken' };
    }

    checkUser = await User.checkUser(id, { username });
    if (checkUser.length > 0) {
      return { err_msg: 'Username already taken' };
    }

    if (password) {
      const isMatch = await comparePassword(password, user.password);
      if (!isMatch) {
        // password = password;
        password = await hashPassword(password);
      } else {
        password = user.password;
      }
    } else {
      password = user.password;
    }

    const updated_on = new Date();

    let updateUserInfo = {
      id,
      name,
      email,
      username,
      password,
      updated_on,
    };

    const updated = await User.updateUser(updateUserInfo);

    return updated;
  } catch (err) {
    console.log('updateUserService');
    console.error(err.message);
    return new Error(err);
  }
};

const deleteUserService = async (id, password) => {
  try {
    let user = await User.findById(id, true);

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return { err_msg: 'Password does not match' };
    }

    const deleted = await User.deleteUser(id);

    return deleted;
  } catch (err) {
    console.log('deleteUserService');
    console.error(err.message);
    return new Error(err);
  }
};

export {
  registerUserService,
  getUserService,
  updateUserService,
  deleteUserService,
};
