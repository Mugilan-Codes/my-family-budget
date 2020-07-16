import { addUser } from '../services/users';

const registerUser = async (req, res) => {
  const { name, email, password, username } = req.body;

  let user = await addUser({ name, email, password, username });

  res.json(user);
};

export { registerUser };
