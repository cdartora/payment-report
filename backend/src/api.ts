import express from "express";
import bodyParser from 'body-parser';
import cors from "cors";
import "express-async-errors"
import * as dotenv from "dotenv";

import login from "./login/route";
import errorMiddleware from "./middlewares/error";
import appointiment from "./appointments/route";

dotenv.config()

const app = express()

app.use(cors())
app.use(bodyParser.json())

app.use("/login", login)
app.use("/appointment", appointiment)

app.use(errorMiddleware)

export default app;