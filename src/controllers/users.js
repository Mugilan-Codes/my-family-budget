import { addUser } from '../services/users';

const registerUser = async (req, res) => {
  const { name, email, password, username } = req.body;
  try {
    const user = await addUser({ name, email, password, username });

    if (user.err_msg) {
      return res.status(400).json({ errors: [{ msg: user.err_msg }] });
    }

    // return json web token

    res.json(user);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Sever Error');
  }
};

export { registerUser };
