import { Request, Response } from "express";
import app from "./api";

const { PORT = 3001 } = process.env;

app.get('/', (_req: Request, res: Response) => {
  res.status(200).send('<h1>Up and running.</h1>')
})

app.listen(PORT, () => {
  console.log(`Servidor ouvindo porta ${PORT}`);
})