import { StatusCodes } from "http-status-codes";
import { prisma } from "../prisma";
import { Appointment, Client } from "../types/user";
import BaseError from "../utils/baseError";

const getAll = async () => {
  const clients = await prisma.client.findMany();
  if (clients.length === 0) throw BaseError(StatusCodes.NOT_FOUND, "no clients found");
  return clients;
};

const create = async (client: Client) => {
  await prisma.client.create({
    data: client
  })
}

const update = async (client: Client, id: string) => {
  await prisma.client.update({
    where: { id },
    data: client,
  });
}

const destroy = async (id: string) => {
  await prisma.appointment.deleteMany({
    where: { clientId: id }
  })
  await prisma.client.delete({
    where: { id }
  });
}

export default { getAll, create, update, destroy };