"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = require("../services");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
require("dotenv/config");
const constants_1 = require("../constants");
async function loginMiddleware(request, response, next) {
    const { email, password } = request.body;
    const service = new services_1.UserService();
    const user = await service.findOne({ where: { email } });
    if (!email || !password) {
        return response.status(constants_1.HttpBadRequestCode).json({
            message: 'fill in all fields',
        });
    }
    if (!user) {
        return response.status(constants_1.HttpBadRequestCode).json((0, constants_1.field)('Password or Email'));
    }
    const isValidPassword = await bcryptjs_1.default.compare(password, user.password);
    if (!isValidPassword) {
        return response.status(constants_1.HttpBadRequestCode).json((0, constants_1.field)('Password or Email'));
    }
    next();
}
exports.default = loginMiddleware;
//# sourceMappingURL=login.js.map