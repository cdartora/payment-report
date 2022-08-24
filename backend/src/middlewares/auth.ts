import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import BaseError from "../utils/baseError";

const { decodedToken } = require('../auth/token');
const { User } = require('../database/models');

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  const token = authorization;

  const decoded = await decodedToken(token);

  if (!decoded) {
    throw BaseError(StatusCodes.UNAUTHORIZED, "invalid token")
  }

  const user = await User.findByPk(decoded.id);

  next();
};

module.exports = {
  authMiddleware,
}; 