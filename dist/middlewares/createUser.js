"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkRegistration = void 0;
const constants_1 = require("../constants");
const services_1 = require("../services");
async function checkRegistration(request, response, next) {
    const { email, password } = request.body;
    const service = new services_1.UserService();
    const users = await service.find();
    const userCreate = users.find((user) => user.email === email);
    if (userCreate) {
        return response.status(constants_1.HttpBadRequestCode).json({
            message: 'Email already registered',
        });
    }
    if (password.length <= 6) {
        return response.status(constants_1.HttpBadRequestCode).json({
            message: (0, constants_1.fieldSize)('Password', 6),
        });
    }
    if (email.length === 8) {
        return response.status(constants_1.HttpBadRequestCode).json({
            message: (0, constants_1.field)('Email'),
        });
    }
    next();
}
exports.checkRegistration = checkRegistration;
//# sourceMappingURL=createUser.js.map