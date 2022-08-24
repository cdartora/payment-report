import { Router } from "express";
import controller from "./controller";
import { authMiddleware } from "../middlewares/auth";
// import validateJoi from "../middlewares/validation";
// import schemas from "../schemas"

const appointiment = Router()

appointiment.get("/", authMiddleware, controller.getAll)
// appointiment.post("/", validateJoi(schemas.login), controller.login)

export default appointiment;