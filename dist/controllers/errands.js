"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = require("../errors");
const services_1 = require("../services");
const constants_1 = require("../constants");
const repositories_1 = require("../database/repositories");
class ErrandController {
    async index(request, response) {
        const { userId } = request.params;
        const errandService = new services_1.ErrandService();
        const cacheRepository = new repositories_1.CacheRepository();
        try {
            const errand = await errandService.find(userId);
            const errandAuth = errand?.filter((errand) => errand.userId === userId);
            const cache = await cacheRepository.get(`errands:${userId}`);
            const errandsCache = errandAuth.map((errand) => {
                return {
                    id: errand.id,
                    message: errand.message,
                    userId: errand.userId,
                };
            });
            if (cache)
                return response.status(201).json(cache);
            await cacheRepository.setEx(`errands:${userId}`, errandsCache, 60 * 24);
            return response.json(errandsCache);
        }
        catch (error) {
            throw new errors_1.HttpError(constants_1.defaultErrorMessage, constants_1.HttpInternalErrorCode);
        }
    }
    async store(request, response) {
        const { userId } = request.params;
        const { message } = request.body;
        const service = new services_1.ErrandService();
        const cacheRepository = new repositories_1.CacheRepository();
        const user = await service.find(userId);
        const userAuth = user?.filter((user) => user.userId === userId);
        if (!user) {
            return response.status(400).json('You not authorization!');
        }
        try {
            if (userAuth) {
                const messages = await service.create({
                    message,
                    userId,
                });
                await cacheRepository.delete(`errand:${userId}`);
                return response
                    .status(constants_1.httpCreatedCode)
                    .json((0, constants_1.createMessage)(`Created ${message}`));
            }
        }
        catch (error) {
            throw new errors_1.HttpError(constants_1.defaultErrorMessage, constants_1.HttpInternalErrorCode);
        }
    }
    async update(request, response) {
        const { id, userId } = request.params;
        const { message } = request.body;
        const service = new services_1.ErrandService();
        const cacheRepository = new repositories_1.CacheRepository();
        try {
            await service.update({
                id: parseInt(id),
                message,
                userId,
            });
            await cacheRepository.delete(`errand:${userId}`);
            return response
                .status(constants_1.httpCreatedCode)
                .json((0, constants_1.createMessage)(`${message} edited`));
        }
        catch (error) {
            throw new errors_1.HttpError(constants_1.defaultErrorMessage, constants_1.HttpInternalErrorCode);
        }
    }
    async delete(request, response) {
        const { id, userId } = request.params;
        const service = new services_1.ErrandService();
        const cacheRepository = new repositories_1.CacheRepository();
        try {
            await service.delete(parseInt(id));
            await cacheRepository.delete(`errand:${userId}`);
            return response.status(constants_1.httpSucessCode).json((0, constants_1.createMessage)('Deleted'));
        }
        catch (error) {
            throw new errors_1.HttpError(constants_1.defaultErrorMessage, constants_1.HttpInternalErrorCode);
        }
    }
}
exports.default = ErrandController;
//# sourceMappingURL=errands.js.map