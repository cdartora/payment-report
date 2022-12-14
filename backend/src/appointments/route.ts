import { Router } from "express";
import controller from "./controller";
import { authMiddleware } from "../middlewares/auth";
import validateJoi from "../middlewares/validation";
import schemas from "../schemas"

const appointment = Router()

appointment.get("/", authMiddleware, controller.getAll)
appointment.post("/", authMiddleware, validateJoi(schemas.createAppointment), controller.create)
appointment.put("/:id", authMiddleware, validateJoi(schemas.createAppointment), controller.update)
appointment.delete("/:id", authMiddleware, controller.destroy)

export default appointment;