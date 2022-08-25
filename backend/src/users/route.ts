import { Router } from "express";
import validateJoi from "../middlewares/validation";
import controller from "./controller";
import schemas from "../schemas"

const user = Router()

user.post("/", validateJoi(schemas.createUser), controller.createUser)

export default user