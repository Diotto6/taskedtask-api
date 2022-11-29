"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const constants_1 = require("../constants");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function authMiddleware(request, response, next) {
    const { authorization } = request.headers;
    if (!authorization) {
        return response
            .json({ message: "Não autorizado(a)" })
            .sendStatus(constants_1.HttpUnauthorized);
    }
    const token = authorization.replace("Bearer", "").trim();
    try {
        const data = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const { id } = data;
        request.userId = id;
        next();
    }
    catch {
        return response.sendStatus(constants_1.HttpUnauthorized);
    }
}
exports.authMiddleware = authMiddleware;
//# sourceMappingURL=auth.js.map