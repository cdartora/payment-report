import { StatusCodes } from "http-status-codes";
import { prisma } from "../prisma";
import { Appointment } from "../types/user";
import BaseError from "../utils/baseError";
import appointment from "./route";

const getAll = async (userId: string) => {
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
    where: {
      userId,
    }
  });
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

const validateUserId = async (appointmentId: string, userId: string) => {
  const appointment = await prisma.appointment.findFirst({
    where: { id: appointmentId }
  });
  if (!appointment) throw BaseError(StatusCodes.NOT_FOUND, "appointment not found");
  if (appointment.userId !== userId) {
    throw BaseError(StatusCodes.UNAUTHORIZED, "permission invalid");
  }
};

const update = async (appointment: Appointment, id: string) => {
  await validateClient(appointment.clientId);
  await validateUserId(id, appointment.userId)
  await prisma.appointment.update({
    where: { id },
    data: appointment,
  });
}

const destroy = async (id: string, userId: string) => {
  await validateUserId(id, userId)
  await prisma.appointment.delete({
    where: { id }
  });
}

export default { getAll, create, update, destroy };