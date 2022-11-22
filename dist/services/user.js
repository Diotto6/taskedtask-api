"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const repositories_1 = require("../database/repositories");
class UserService {
    async find() {
        const repository = new repositories_1.UserRepository();
        const user = await repository.find();
        return user;
    }
    async findOne(id) {
        const repository = new repositories_1.UserRepository();
        const user = await repository.findOne(id);
        return user;
    }
    async create(userDTO) {
        const repository = new repositories_1.UserRepository();
        const user = await repository.create(userDTO);
        return user;
    }
    async update(userDTO) {
        const repository = new repositories_1.UserRepository();
        const user = await repository.update(userDTO);
        return user;
    }
    async delete(id) {
        const repository = new repositories_1.UserRepository();
        await repository.delete(id);
    }
}
exports.UserService = UserService;
//# sourceMappingURL=user.js.map