import { NextFunction, Request, Response } from "express";
import BaseError from "../utils/baseError";
import Joi from "joi";
import { StatusCodes } from "http-status-codes";

const validateJoi = (schema: Joi.ObjectSchema) => (req: Request, _res: Response, next: NextFunction) => {
  const { error } = schema.validate(req.body);
  if (error) {
    throw BaseError(StatusCodes.BAD_REQUEST, error.details[0].message);
  }
  next();
};

export default validateJoi