import { UserService } from "./../services/user";
import e, { Response, Request } from "express";
import { HttpError } from "../errors";
import { ErrandService } from "../services";

import {
  createMessage,
  defaultErrorMessage,
  httpCreatedCode,
  HttpInternalErrorCode,
  httpSucessCode,
} from "../constants";

export default class ErrandController {
  async index(request: Request, response: Response) {
    const { userId } = request.params;
    const errandService = new ErrandService();

    try {
      const errand = await errandService.find(userId);
      const errandAuth = errand?.filter((errand) => errand.userId === userId);
      const errands = errandAuth.map((errand) => {
        return {
          id: errand.id,
          message: errand.message,
          userId: errand.userId,
        };
      });

      if (errands) return response.json(errands).status(201);
    } catch (error) {
      throw new HttpError(defaultErrorMessage, HttpInternalErrorCode);
    }
  }

  async store(request: Request, response: Response) {
    const { userId } = request.params;
    const { message } = request.body;
    const service = new ErrandService();

    const user = await service.find(userId);
    const userAuth = user?.filter((user) => user.userId === userId);
    if (!user) {
      return response.json("Você não está autorizado!").status(400);
    }
    try {
      if (userAuth) {
        const messages = await service.create({
          message,
          userId,
        });
        return response
          .json(createMessage("Recado criado com sucesso!"))
          .status(httpCreatedCode);
      }
    } catch (error) {
      throw new HttpError(defaultErrorMessage, HttpInternalErrorCode);
    }
  }

  async update(request: Request, response: Response) {
    const { id, userId } = request.params;
    const { message } = request.body;
    const service = new ErrandService();

    try {
      await service.update({
        id,
        message,
        userId,
      });

      return response
        .json(createMessage(`"${message}" editada`))
        .status(httpCreatedCode);
    } catch (error) {
      throw new HttpError(defaultErrorMessage, HttpInternalErrorCode);
    }
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;

    const service = new ErrandService();

    try {
      await service.delete(id);

      return response
        .json(createMessage("Recado deletado"))
        .status(httpSucessCode);
    } catch (error) {
      throw new HttpError(defaultErrorMessage, HttpInternalErrorCode);
    }
  }
}
