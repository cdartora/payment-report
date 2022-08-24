import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import BaseError from "../utils/baseError";

export default (err: BaseError, _req: Request, res: Response, _next: NextFunction) => {
  return res.status(err.status || StatusCodes.INTERNAL_SERVER_ERROR).send({ message: err.message });
}