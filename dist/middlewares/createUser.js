"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkRegistration = void 0;
const constants_1 = require("../constants");
const repositories_1 = require("../database/repositories");
async function checkRegistration(request, response, next) {
    const { email } = request.body;
    const service = new repositories_1.UserRepository();
    const users = await service.find(email);
    const userCreate = users.find((user) => user.email === email);
    if (userCreate) {
        return response
            .json({
            ok: false,
            message: "Email ja está cadastrado!",
        })
            .status(constants_1.HttpBadRequestCode);
    }
    next();
}
exports.checkRegistration = checkRegistration;
//# sourceMappingURL=createUser.js.map