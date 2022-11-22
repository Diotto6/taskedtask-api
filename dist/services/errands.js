"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrandService = void 0;
const repositories_1 = require("../database/repositories");
class ErrandService {
    async find(userId) {
        const repository = new repositories_1.ErrandRepository();
        const errands = await repository.find(userId);
        return errands;
    }
    async findOne(id) {
        const repository = new repositories_1.ErrandRepository();
        const errand = await repository.findOne(id);
        return errand;
    }
    async create(errandDTO) {
        const repository = new repositories_1.ErrandRepository();
        const errands = await repository.create(errandDTO);
        return errands;
    }
    async update(errandDTO) {
        const repository = new repositories_1.ErrandRepository();
        const errand = await repository.update(errandDTO);
        return errand;
    }
    async delete(errandId) {
        const repository = new repositories_1.ErrandRepository();
        await repository.delete(errandId);
    }
}
exports.ErrandService = ErrandService;
//# sourceMappingURL=errands.js.map