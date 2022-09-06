import { StatusCodes } from "http-status-codes";
import { prisma } from "../prisma";
import { Client } from "../types/user";
import BaseError from "../utils/baseError";

const getAll = async (userId: string) => {
  const clients = await prisma.client.findMany({
    where: { userId }
  });
  return clients;
};

const create = async (client: Client) => {
  await prisma.client.create({
    data: client
  })
}

const validateUserId = async (clientId: string, userId: string) => {
  const client = await prisma.client.findFirst({
    where: { id: clientId }
  });
  if (!client) throw BaseError(StatusCodes.NOT_FOUND, "client not found");
  if (client.userId !== userId) {
    throw BaseError(StatusCodes.UNAUTHORIZED, "permission invalid");
  }
};

const update = async (client: Client, id: string) => {
  await validateUserId(client.userId, id);
  await prisma.client.update({
    where: { id },
    data: client,
  });
}

const destroy = async (id: string, userId: string) => {
  await validateUserId(id, userId)
  await prisma.appointment.deleteMany({
    where: { clientId: id }
  })
  await prisma.client.delete({
    where: { id }
  });
}

export default { getAll, create, update, destroy };