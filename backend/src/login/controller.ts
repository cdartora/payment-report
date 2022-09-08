import { Request, Response } from "express"
import { StatusCodes } from "http-status-codes";
import service from "./service";

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await service.login(email, password);

  return res.status(StatusCodes.OK).send(user)
}

const validate = async (_req: Request, res: Response) => {
  res.status(StatusCodes.OK).send({ message: "token validado" })
};

export default { login, validate };