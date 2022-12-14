import Joi from "joi";

const login = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
})

const createAppointment = Joi.object({
  clientId: Joi.string().required(),
  value: Joi.number().required(),
  installments: Joi.number().required(),
  isPaid: Joi.bool().required(),
});

const createUser = Joi.object({
  name: Joi.string().min(5).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const createClient = Joi.object({
  name: Joi.string().min(5).required(),
});

export default {
  login,
  createAppointment,
  createUser,
  createClient,
}