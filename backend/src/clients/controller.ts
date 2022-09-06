import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { Client, RequestWithUser } from "../types/user";
import service from "./service";

const getAll = async (req: RequestWithUser, res: Response) => {
  const userId = req.user?.id;

  const clients = await service.getAll(userId as string);

  res.status(StatusCodes.OK).send(clients);
}

const create = async (req: RequestWithUser, res: Response) => {
  const { body } = req;
  const userId = req.user?.id;


  await service.create({ ...body, userId } as Client);
  res.status(StatusCodes.CREATED).send({ message: "created successfully" });
}

const update = async (req: RequestWithUser, res: Response) => {
  const { id } = req.params;
  const { body } = req;
  const userId = req.user?.id;

  await service.update({ ...body, userId } as Client, id);
  res.status(StatusCodes.OK).send({ message: "updated successfully" });
}

const destroy = async (req: RequestWithUser, res: Response) => {
  const userId = req.user?.id;
  const { id } = req.params;

  await service.destroy(id, userId as string);
  res.status(StatusCodes.OK).send({ message: "deleted successfully" })
}

export default { getAll, create, update, destroy }