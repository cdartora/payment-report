import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import service from "./service";

const getAll = async (_req: Request, res: Response) => {
  const appointments = await service.getAll();

  res.status(StatusCodes.OK).send(appointments);
}

export default { getAll }