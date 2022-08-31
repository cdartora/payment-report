import { Router } from "express";
import validateJoi from "../middlewares/validation";
import controller from "./controller";
import schemas from "../schemas"
import { authMiddleware } from "../middlewares/auth";

const login = Router()

login.post("/", validateJoi(schemas.login), controller.login)
login.post("/validate", authMiddleware, controller.validate)

export default login