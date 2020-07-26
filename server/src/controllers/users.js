import {
  addUser,
  retrieveUser,
  updateUser,
  deleteUserService,
} from '../services/users';
import { generateAccessToken } from '../utils/token';
import { comparePassword } from '../utils/crypt';

/*
 * @route   POST api/users/
 *
 * @desc    Register User
 *
 * @param   {string}  name
 * @param   {string}  email
 * @param   {string}  password
 * @param   {string}  [username=null]
 */
const registerUser = async (req, res, next) => {
  const { name, email, password, username } = req.body;
  try {
    const user = await addUser({ name, email, password, username });

    if (user.err_msg) {
      return res.status(409).json({ errors: [{ msg: user.err_msg }] });
    }

    const payload = {
      user: { id: user.id },
    };

    const token = generateAccessToken(payload);

    res.json({ token });
  } catch (err) {
    console.log(err.message);
    next(err);
  }
};

/*
 * @route   GET api/users/
 * @access  private
 *
 * @desc    Get Current User
 */
const getUser = async (req, res, next) => {
  const { id } = req.user;
  try {
    const user = await retrieveUser({ id });

    if (!user) {
      return res.status(404).json({ errors: [{ msg: 'User Not Found' }] });
    }

    res.json(user);
  } catch (err) {
    console.log(err.message);
    next(err);
  }
};

/*
 * @route   POST api/users/auth
 *
 * @desc    Authenticate User
 *
 * @param   {string}  [username or email]
 * @param   {string}  password
 */
const loginUser = async (req, res, next) => {
  const { email, username, password } = req.body;
  try {
    const user = await retrieveUser({ email, username });

    if (user.err_msg) {
      return res.status(401).json({ errors: [{ msg: user.err_msg }] });
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ errors: [{ msg: 'Invalid Credentials' }] });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    const token = generateAccessToken(payload);

    res.json({ token });
  } catch (err) {
    console.log(err.message);
    next(err);
  }
};

const update = async (req, res, next) => {
  const { name, email, username, password } = req.body;
  const { id } = req.user;

  try {
    const updatedUser = await updateUser({
      id,
      name,
      email,
      username,
      password,
    });

    if (updatedUser.err_msg) {
      return res.status(401).json({ errors: [{ msg: updatedUser.err_msg }] });
    }

    console.log({ updatedUser });

    res.send('User Updated');
  } catch (err) {
    console.log(err.message);
    next(err);
  }
};

const deleteUser = async (req, res, next) => {
  const { password } = req.body;
  const { id } = req.user;

  try {
    const deletedUser = await deleteUserService(id, password);

    if (deletedUser.err_msg) {
      return res.status(401).json({ errors: [{ msg: deletedUser.err_msg }] });
    }

    console.log({ deletedUser });

    res.send('User Deleted');
  } catch (err) {
    console.log(err.message);
    next(err);
  }
};

export { registerUser, getUser, loginUser, update, deleteUser };
