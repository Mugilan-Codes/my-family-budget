import { v4 as uuidv4 } from 'uuid';

import Admin from '../db/admins';

const addAdminService = async ({ name, email, password, username }) => {
  try {
    let user = await Admin.getAdmin({ email });
    if (user) {
      return { err_msg: 'Email already exists' };
    }

    user = await Admin.getAdmin({ username });
    if (user) {
      return { err_msg: 'Username already exists' };
    }

    const id = uuidv4();
    const created_on = new Date();
    const updated_on = new Date();

    const newAdmin = {
      id,
      name,
      email,
      password,
      username,
      created_on,
      updated_on,
    };

    return await Admin.addAdmin(newAdmin);
  } catch (err) {
    console.log(err.message);
    return new Error(err);
  }
};

export { addAdminService };
