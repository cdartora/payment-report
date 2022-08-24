import { Router } from "express";
import validateJoi from "../middlewares/validation";
import controller from "./controller";
import schemas from "../schemas"

const login = Router()

login.post("/", validateJoi(schemas.login), controller.login)

export default login