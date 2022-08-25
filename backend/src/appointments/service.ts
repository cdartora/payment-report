import { StatusCodes } from "http-status-codes";
import { prisma } from "../prisma";
import { Appointment } from "../types/user";
import BaseError from "../utils/baseError";

const getAll = async () => {
  const appointments = await prisma.appointment.findMany({
    select: {
      id: true,
      clientId: false,
      client: true,
      value: true,
      installments: true,
      createdAt: true,
      isPaid: true,
    },
  });
  if (appointments.length === 0) throw BaseError(StatusCodes.NOT_FOUND, "no appointments found");
  return appointments;
};

const validateClient = async (id: string) => {
  const client = await prisma.client.findFirst({
    where: { id }
  });
  if (!client) throw BaseError(StatusCodes.NOT_FOUND, "client not found");
};

const create = async (appointment: Appointment) => {
  await validateClient(appointment.clientId);
  await prisma.appointment.create({
    data: appointment
  })
}

const update = async (appointment: Appointment, id: string) => {
  await validateClient(appointment.clientId);
  await prisma.appointment.update({
    where: { id },
    data: appointment,
  });
}

const destroy = async (id: string) => {
  await prisma.appointment.delete({
    where: { id }
  });
}

export default { getAll, create, update, destroy };