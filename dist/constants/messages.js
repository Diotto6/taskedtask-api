"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.field = exports.fieldSize = exports.createMessage = exports.defaultErrorMessage = void 0;
exports.defaultErrorMessage = 'An Error Occurred, Please Try Again Later';
const createMessage = (action) => {
    return { message: `${action} successfully.` };
};
exports.createMessage = createMessage;
const fieldSize = (field, length) => `${field} must be longer than ${length} characters.`;
exports.fieldSize = fieldSize;
function field(field) {
    return { message: `Incorrect ${field}` };
}
exports.field = field;
//# sourceMappingURL=messages.js.map