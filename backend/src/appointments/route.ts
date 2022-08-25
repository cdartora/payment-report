import { Router } from "express";
import controller from "./controller";
import { authMiddleware } from "../middlewares/auth";
import validateJoi from "../middlewares/validation";
import schemas from "../schemas"

const appointiment = Router()

appointiment.get("/", authMiddleware, controller.getAll)
appointiment.post("/", authMiddleware, validateJoi(schemas.createAppointment), controller.create)
appointiment.put("/:id", validateJoi(schemas.createAppointment), controller.update)
appointiment.delete("/:id", controller.destroy)

export default appointiment;