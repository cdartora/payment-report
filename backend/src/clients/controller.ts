import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { Client } from "../types/user";
import service from "./service";

const getAll = async (_req: Request, res: Response) => {
  const clients = await service.getAll();

  res.status(StatusCodes.OK).send(clients);
}

const create = async (req: Request, res: Response) => {
  const { body } = req;
  await service.create(body as Client);
  res.status(StatusCodes.CREATED).send({ message: "created successfully" });
}

const update = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = req;
  await service.update(body as Client, id);
  res.status(StatusCodes.OK).send({ message: "updated successfully" });
}

const destroy = async (req: Request, res: Response) => {
  const { id } = req.params;
  await service.destroy(id);
  res.status(StatusCodes.OK).send({ message: "deleted successfully" })
}

export default { getAll, create, update, destroy }