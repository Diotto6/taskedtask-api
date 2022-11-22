"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = require("../services");
const errors_1 = require("../errors");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
const constants_1 = require("../constants");
class UserController {
    index(request, response) {
        try {
            return response.json({
                ok: true,
                message: 'Email is autheticated',
                userID: request.userId,
            });
        }
        catch (error) {
            throw new errors_1.HttpError(constants_1.defaultErrorMessage, constants_1.HttpInternalErrorCode);
        }
    }
    async store(request, response) {
        const { firstName, lastName, userName, email, password } = request.body;
        const service = new services_1.UserService();
        try {
            await service.create({
                firstName: firstName,
                lastName: lastName,
                userName: userName,
                email: email,
                password: password,
            });
            return response.status(constants_1.httpCreatedCode).json((0, constants_1.createMessage)('Created'));
        }
        catch (error) {
            throw new errors_1.HttpError(constants_1.defaultErrorMessage, constants_1.HttpInternalErrorCode);
        }
    }
    async authenticate(request, response) {
        const { email } = request.body;
        const service = new services_1.UserService();
        const user = await service.findOne({ where: { email } });
        try {
            const token = jsonwebtoken_1.default.sign({ id: user?.id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES });
            return response.json({
                ok: true,
                message: 'Successfully logged in',
                token,
            });
        }
        catch (error) {
            throw new errors_1.HttpError(constants_1.defaultErrorMessage, constants_1.HttpInternalErrorCode);
        }
    }
}
exports.default = UserController;
//# sourceMappingURL=user.js.map