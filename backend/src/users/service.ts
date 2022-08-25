import { StatusCodes } from "http-status-codes";
import { prisma } from "../prisma";
import bcrypt from "bcrypt"
import { User } from "../types/user";
import BaseError from "../utils/baseError";

const createUser = async (user: User) => {
  const userFound = await prisma.user.findFirst({ where: { email: user.email } });
  if (userFound) throw BaseError(StatusCodes.CONFLICT, "user already registered");
  const passwordHashed = await bcrypt.hash(user.password, 1);
  await prisma.user.create({
    data: {
      ...user,
      password: passwordHashed,
    }
  });
};

export default { createUser };