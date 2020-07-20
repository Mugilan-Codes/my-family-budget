import { Joi } from 'celebrate';

const registerSchema = Joi.object({
  name: Joi.string().max(30).required(),
  email: Joi.string().email().max(50).required(),
  password: Joi.string().min(6).required(),
  username: Joi.string().min(5).max(30).optional().default(null),
});

const loginSchema = Joi.object({
  email: Joi.string().email(),
  username: Joi.string().min(5),
  password: Joi.string().required(),
}).xor('email', 'username');

export { loginSchema, registerSchema };
