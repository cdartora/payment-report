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
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const createClient = Joi.object({
  name: Joi.string().required(),
});

const updateClient = Joi.object({
  name: Joi.string().required(),
  id: Joi.string().required(),
});

export default {
  login,
  createAppointment,
  createUser,
  createClient,
  updateClient
}