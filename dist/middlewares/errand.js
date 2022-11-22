"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyCreateErrand = void 0;
const constants_1 = require("../constants");
function verifyCreateErrand(request, response, next) {
    const { message } = request.body;
    if (!message) {
        return response.status(constants_1.HttpBadRequestCode).json({
            message: 'Fill in the message',
        });
    }
    next();
}
exports.verifyCreateErrand = verifyCreateErrand;
//# sourceMappingURL=errand.js.map