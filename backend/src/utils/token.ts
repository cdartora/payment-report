import * as jwt from "jsonwebtoken";
import { User } from "../types/user";

const SECRET: jwt.Secret = process.env.SECRET || "segredo";

export const createToken = (user: User) => {
  const token = jwt.sign(user, SECRET, { expiresIn: "1d", algorithm: "HS256" });

  return token;
}

export const decodeToken = (token: string): User => {
  const data = jwt.verify(token, SECRET);

  return data as User;
}
