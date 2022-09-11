import { Router } from "express";
import { authMiddleware } from "../middlewares/auth";
import validateJoi from "../middlewares/validation";
import schemas from "../schemas"
import controller from "./controller";

const client = Router()

client.get("/", authMiddleware, controller.getAll)
client.post("/", authMiddleware, validateJoi(schemas.createClient), controller.create)
client.put("/:id", authMiddleware, validateJoi(schemas.createClient), controller.update)
client.delete("/:id", authMiddleware, controller.destroy)

export default client;