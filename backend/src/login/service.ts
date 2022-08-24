import { StatusCodes } from "http-status-codes";
import bcrypt from "bcrypt";

import { prisma } from "../prisma";
import BaseError from "../utils/baseError";
import { createToken } from "../utils/token";
import { User } from "../types/user";

const login = async (email: string, password: string) => {
  const user = await prisma.user.findFirst({
    where: { email }
  });

  if (!user) throw BaseError(StatusCodes.NOT_FOUND, "user not found")
  if (!bcrypt.compareSync(password, user.password)) {
    throw BaseError(StatusCodes.BAD_REQUEST, "invalid credentials")
  }

  const token = createToken(user as User);

  return token;
};

export default { login };