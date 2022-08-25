import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { prisma } from "../prisma";
import BaseError from "../utils/baseError";
import bcrypt from "bcrypt";
import { decodeToken } from "../utils/token";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  const token = authorization;

  if (!token) throw BaseError(StatusCodes.UNAUTHORIZED, "token not found")

  const decoded = decodeToken(token);

  if (!decoded) {
    throw BaseError(StatusCodes.UNAUTHORIZED, "invalid token")
  }

  const user = await prisma.user.findFirst({
    where: { id: decoded.id }
  });

  if (!user || bcrypt.compareSync(decoded.password, user.password) || decoded.email !== user.email) {
    throw BaseError(StatusCodes.UNAUTHORIZED, "invalid token")
  }

  next();
};
