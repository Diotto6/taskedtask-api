import { Response, Request } from "express";
import { HttpError } from "../errors";
import {
  createMessage,
  defaultErrorMessage,
  httpCreatedCode,
  HttpInternalErrorCode,
  httpSucessCode,
} from "../constants";
import { ErrandEntity, UserEntity } from "../database/entities";
import { ErrandRepository } from "../database/repositories";
import { CacheRepository } from "../database/repositories/cache";

export default class ErrandController {
  async index(request: Request, response: Response) {
    const { userId } = request.params;
    const cacheRepository = new CacheRepository();
    const service = await UserEntity.find({ where: { id: userId } });
    try {
      const errands = await ErrandEntity.find({ where: { userId: userId } });
      const errand = errands.map((errand) => {
        return {
          id: errand.id,
          message: errand.message,
          userId: errand.userId,
        };
      });
      await cacheRepository.get("msg");
      if (errand)
        return response
          .json({
            errand,
            service,
          })
          .status(201);
    } catch (error) {
      throw new HttpError(defaultErrorMessage, HttpInternalErrorCode);
    }
  }

  async store(request: Request, response: Response) {
    const { userId } = request.params;
    const { message } = request.body;
    const service = new ErrandRepository();

    const cacheRepository = new CacheRepository();
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
        await cacheRepository.set("msg", messages);
        return response
          .json({
            ok: true,
            message: createMessage("Recado criado"),
          })
          .status(httpCreatedCode);
      }
    } catch (error) {
      throw new HttpError(defaultErrorMessage, HttpInternalErrorCode);
    }
  }

  async update(request: Request, response: Response) {
    const { id, userId } = request.params;
    const { message } = request.body;
    const service = new ErrandRepository();
    const cacheRepository = new CacheRepository();
    try {
      await service.update({
        id,
        message,
        userId,
      });
      await cacheRepository.delete("msg");
      return response
        .json({
          ok: true,
          message: createMessage("Recado alterado"),
        })
        .status(httpCreatedCode);
    } catch (error) {
      console.error(error);
      throw new HttpError(defaultErrorMessage, HttpInternalErrorCode);
    }
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;
    const cacheRepository = new CacheRepository();
    const service = new ErrandRepository();
    await cacheRepository.delete("msg");
    try {
      await service.delete(id);

      return response
        .json({
          ok: true,
          message: createMessage("Recado deletado"),
        })
        .status(httpSucessCode);
    } catch (error) {
      throw new HttpError(defaultErrorMessage, HttpInternalErrorCode);
    }
  }
}
