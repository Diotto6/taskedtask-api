"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../errors");
const constants_1 = require("../constants");
const entities_1 = require("../database/entities");
const repositories_1 = require("../database/repositories");
const cache_1 = require("../database/repositories/cache");
class ErrandController {
    async index(request, response) {
        const { userId } = request.params;
        const cacheRepository = new cache_1.CacheRepository();
        const service = await entities_1.UserEntity.find({ where: { id: userId } });
        try {
            const errands = await entities_1.ErrandEntity.find({ where: { userId: userId } });
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
        }
        catch (error) {
            throw new errors_1.HttpError(constants_1.defaultErrorMessage, constants_1.HttpInternalErrorCode);
        }
    }
    async store(request, response) {
        const { userId } = request.params;
        const { message } = request.body;
        const service = new repositories_1.ErrandRepository();
        const cacheRepository = new cache_1.CacheRepository();
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
                    message: (0, constants_1.createMessage)("Recado criado"),
                })
                    .status(constants_1.httpCreatedCode);
            }
        }
        catch (error) {
            throw new errors_1.HttpError(constants_1.defaultErrorMessage, constants_1.HttpInternalErrorCode);
        }
    }
    async update(request, response) {
        const { id, userId } = request.params;
        const { message } = request.body;
        const service = new repositories_1.ErrandRepository();
        const cacheRepository = new cache_1.CacheRepository();
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
                message: (0, constants_1.createMessage)("Recado alterado"),
            })
                .status(constants_1.httpCreatedCode);
        }
        catch (error) {
            console.error(error);
            throw new errors_1.HttpError(constants_1.defaultErrorMessage, constants_1.HttpInternalErrorCode);
        }
    }
    async delete(request, response) {
        const { id } = request.params;
        const cacheRepository = new cache_1.CacheRepository();
        const service = new repositories_1.ErrandRepository();
        await cacheRepository.delete("msg");
        try {
            await service.delete(id);
            return response
                .json({
                ok: true,
                message: (0, constants_1.createMessage)("Recado deletado"),
            })
                .status(constants_1.httpSucessCode);
        }
        catch (error) {
            throw new errors_1.HttpError(constants_1.defaultErrorMessage, constants_1.HttpInternalErrorCode);
        }
    }
}
exports.default = ErrandController;
//# sourceMappingURL=errands.js.map