"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = __importDefault(require("../controllers/user"));
const errands_1 = __importDefault(require("../controllers/errands"));
const middlewares_1 = require("../middlewares");
const login_1 = __importDefault(require("../middlewares/login"));
class NewRoutes {
    init() {
        const router = (0, express_1.Router)();
        const userController = new user_1.default();
        const errandsController = new errands_1.default();
        router.get('/', (req, res) => {
            return res.send('application running successfully');
        });
        router.post('/auth', login_1.default, userController.authenticate);
        router.post('/user', middlewares_1.checkRegistration, userController.store);
        router.get('/user', login_1.default, middlewares_1.authMiddleware, userController.index);
        router.use(middlewares_1.authMiddleware);
        router.get('/errand/:userId', errandsController.index);
        router.post('/errand/:userId', [middlewares_1.verifyCreateErrand], errandsController.store);
        router.put('/errand/:id/:userId', [middlewares_1.verifyCreateErrand], errandsController.update);
        router.delete('/errand/:id/:userId', errandsController.delete);
        return router;
    }
}
exports.default = NewRoutes;
//# sourceMappingURL=new.js.map