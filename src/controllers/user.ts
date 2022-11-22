import { Request, Response } from "express";
import { UserService } from "../services";
import { HttpError } from "../errors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";

import {
  defaultErrorMessage,
  httpCreatedCode,
  HttpInternalErrorCode,
} from "../constants";

export default class UserController {
  async index(request: Request, response: Response) {
    try {
      return response.json({
        ok: true,
        message: "Email autenticado",
        userId: request.userId,
        firstName: request.firstName!,
      });
    } catch (error) {
      throw new HttpError(defaultErrorMessage, HttpInternalErrorCode);
    }
  }

  async store(request: Request, response: Response) {
    const { firstName, lastName, email, password, passwordConfirm } =
      request.body;
    const service = new UserService();

    try {
      await service.create({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        passwordConfirm: passwordConfirm,
      });

      return response
        .json({
          ok: true,
          message: "Conta cadastrada com sucesso",
          firstName: request.firstName,
        })
        .status(httpCreatedCode);
    } catch (error) {
      throw new HttpError(defaultErrorMessage, HttpInternalErrorCode);
    }
  }

  async authenticate(request: Request, response: Response) {
    const { email } = request.body;
    const service = new UserService();
    const user = await service.findOne({ where: { email } });

    try {
      const token = jwt.sign(
        { id: user?.id },
        process.env.JWT_SECRET as string,
        { expiresIn: process.env.JWT_EXPIRES }
      );
      const name = user!.firstName + " " + user!.lastName;
      return response.json({
        ok: true,
        email,
        message: "Logado com sucesso!",
        token,
        name,
      });
    } catch (error) {
      throw new HttpError(defaultErrorMessage, HttpInternalErrorCode);
    }
  }
}
