import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import "dotenv/config";

import { HttpBadRequestCode } from "../constants";
import { NextFunction } from "express";
import { UserRepository } from "../database/repositories";

export async function loginMiddleware(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { email, password } = request.body;
  const service = new UserRepository();
  const users = await service.find(email);
  const user = users.find((user) => user.email === email);

  if (!email || !password) {
    return response
      .json({
        ok: false,
        message: "Preencha os campos obrigatórios!",
      })
      .status(HttpBadRequestCode);
  }
  if (user) {
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return response
        .json({ ok: false, message: "Email ou senha incorretos" })
        .status(HttpBadRequestCode);
    }
  }

  if (!user) {
    return response
      .json({ ok: false, message: "Email ou senha incorretos" })
      .status(HttpBadRequestCode);
  }

  next();
}
