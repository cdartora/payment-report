import { Request, Response } from "express"
import { StatusCodes } from "http-status-codes";
import service from "./service";

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const token = await service.login(email, password);

  return res.status(StatusCodes.OK).send({ token })
}

export default { login };