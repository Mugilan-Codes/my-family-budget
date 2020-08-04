import {
  registerUserService,
  getUserService,
  updateUserService,
  deleteUserService,
} from '../services/users';
import { generateAccessToken } from '../utils/token';
import { comparePassword } from '../utils/crypt';

/*
 * @route   POST /api/users/
 * @desc    Register User
 * @access  Public
 *
 * @param   {string}  name
 * @param   {string}  email
 * @param   {string}  password
 * @param   {string}  [username=null]
 */
const registerUserController = async (req, res, next) => {
  const { name, email, password, username } = req.body;
  try {
    const user = await registerUserService({ name, email, password, username });

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
 * @route   GET /api/users/
 * @desc    Get Current User by Token
 * @access  Private
 */
const getUserController = async (req, res, next) => {
  const { id } = req.user;
  try {
    const user = await getUserService({ id });

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
 * @route   POST /api/auth/
 * @desc    Authenticate User
 * @access  Public
 *
 * @param   {string}  [username or email]
 * @param   {string}  password
 */
const loginUserController = async (req, res, next) => {
  const { email, username, password } = req.body;
  try {
    const user = await getUserService({ email, username });

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

/*
 * @route   PUT /api/users/
 * @access  Private
 * @desc    Update User ( Atleast one param must be present )
 *
 * @param   {string}  [name=null]
 * @param   {string}  [email=null]
 * @param   {string}  [password=null]
 * @param   {string}  [username=null]
 */
const updateUserController = async (req, res, next) => {
  const { name, email, username, password } = req.body;
  const { id } = req.user;

  try {
    const updatedUser = await updateUserService({
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

/*
 * @route   DELETE /api/users/
 * @desc    Delete User
 * @access  Private
 *
 * @param   {string}  password
 */
const deleteUserController = async (req, res, next) => {
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

export {
  registerUserController,
  getUserController,
  loginUserController,
  updateUserController,
  deleteUserController,
};
