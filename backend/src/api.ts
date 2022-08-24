import express from "express";
import bodyParser from 'body-parser';
import cors from "cors";
import * as dotenv from "dotenv";

dotenv.config()

const app = express()
app.use(cors())
app.use(bodyParser.json())

export default app;