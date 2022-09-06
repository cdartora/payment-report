import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import 'express-async-errors';
import * as dotenv from 'dotenv';

import login from './login/route';
import appointment from './appointments/route';
import user from './users/route';
import client from './clients/route';
import errorMiddleware from './middlewares/error';

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/login", login);
app.use("/user", user);
app.use("/client", client);
app.use("/appointment", appointment);

app.use(errorMiddleware);

export default app;