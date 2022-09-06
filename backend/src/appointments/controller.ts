import { Response } from "express";
import { StatusCodes } from "http-status-codes";
import { Appointment, RequestWithUser } from "../types/user";
import service from "./service";

const getAll = async (req: RequestWithUser, res: Response) => {
  const userId = req.user?.id;
  const appointments = await service.getAll(userId as string);

  res.status(StatusCodes.OK).send(appointments);
}

const create = async (req: RequestWithUser, res: Response) => {
  const { body } = req;
  const userId = req.user?.id;

  await service.create({ ...body, userId } as Appointment);
  res.status(StatusCodes.CREATED).send({ message: "created successfully" });
}

const update = async (req: RequestWithUser, res: Response) => {
  const { id } = req.params;
  const { body } = req;
  const userId = req.user?.id;

  await service.update({ ...body, userId }, id);
  res.status(StatusCodes.OK).send({ message: "updated successfully" });
}

const destroy = async (req: RequestWithUser, res: Response) => {
  const { id } = req.params;
  const userId = req.user?.id;


  await service.destroy(id, userId as string);

  res.status(StatusCodes.OK).send({ message: "deleted successfully" })
}

export default { getAll, create, update, destroy }