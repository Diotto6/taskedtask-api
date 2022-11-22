"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrandRepository = void 0;
const errands_1 = require("../entities/errands");
class ErrandRepository {
    async find(id) {
        const errands = await errands_1.ErrandEntity.find({ where: { userId: id } });
        return errands;
    }
    async findOne(id) {
        const errands = await errands_1.ErrandEntity.findOne(id);
        return errands;
    }
    async create(errandDTO) {
        const errand = await new errands_1.ErrandEntity(errandDTO.message, errandDTO.userId);
        errand.save();
        return errand;
    }
    async update(errandDTO) {
        const errand = await errands_1.ErrandEntity.findOne(errandDTO.id);
        if (errand) {
            errand.message = errandDTO.message;
            await errand.save();
        }
        return errand;
    }
    async delete(errandID) {
        await errands_1.ErrandEntity.delete(errandID);
    }
}
exports.ErrandRepository = ErrandRepository;
//# sourceMappingURL=errands.js.map