import { Joi } from 'celebrate';

const loginSchema = Joi.object({
  email: Joi.string().email(),
  username: Joi.string().min(5),
  password: Joi.string().required(),
}).xor('email', 'username');

export { loginSchema };
