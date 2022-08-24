import { StatusCodes } from "http-status-codes";
import { prisma } from "../prisma";
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

export default { getAll };