import { Request, Response, NextFunction } from "express";
import { field, fieldSize, HttpBadRequestCode } from "../constants";
import { UserService } from "../services";

export async function checkRegistration(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { firstName, lastName, email, password, passwordConfirm } =
    request.body;
  const service = new UserService();
  const users = await service.find();
  const userCreate = users.find((user) => user.email === email);

  if (userCreate) {
    return response
      .json({
        message: "Email ja está cadastrado!",
      })
      .status(HttpBadRequestCode);
  }

  if (password.length <= 6) {
    return response
      .json({
        message: fieldSize("Senha", 6),
      })
      .status(HttpBadRequestCode);
  }

  if (email.length === 8) {
    return response
      .json({
        message: field("Email"),
      })
      .status(HttpBadRequestCode);
  }

  const name = `${firstName} ${lastName}`;
  console.log(name);
  request.firstName = name;
  next();
}
