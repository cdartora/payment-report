import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import service from "./service";

const createUser = async (req: Request, res: Response) => {
  const { body } = req;
  await service.createUser(body);
  res.status(StatusCodes.CREATED).send({ message: "user created successfully" })
};

export default { createUser };