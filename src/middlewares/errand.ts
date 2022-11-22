import { Request, Response, NextFunction } from "express";
import { HttpBadRequestCode } from "../constants";

export function verifyCreateErrand(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { message } = request.body;

  if (!message) {
    return response.status(HttpBadRequestCode).json({
      message: "Preencha com uma mensagem!",
    });
  }

  next();
}
