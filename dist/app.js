"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _Application_express;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("reflect-metadata");
const cors_1 = __importDefault(require("cors"));
const new_1 = __importDefault(require("./routers/new"));
const Database_1 = __importDefault(require("./database/connections/Database"));
class Application {
    constructor() {
        _Application_express.set(this, void 0);
        __classPrivateFieldSet(this, _Application_express, (0, express_1.default)(), "f");
    }
    async init() {
        this.config();
        this.routers();
        this.errors();
        await this.database();
    }
    start(port) {
        __classPrivateFieldGet(this, _Application_express, "f").listen(port, () => {
            console.log(`A aplicação está rodando na porta ${port}...`);
        });
    }
    config() {
        __classPrivateFieldGet(this, _Application_express, "f").use(express_1.default.json());
        __classPrivateFieldGet(this, _Application_express, "f").use(express_1.default.urlencoded({ extended: false }));
        __classPrivateFieldGet(this, _Application_express, "f").use((0, cors_1.default)());
    }
    errors() {
        __classPrivateFieldGet(this, _Application_express, "f").use((error, request, response, next) => {
            return response.json({
                message: error.message,
            });
        });
    }
    routers() {
        const newRouter = new new_1.default().init();
        __classPrivateFieldGet(this, _Application_express, "f").use(newRouter);
    }
    async database() {
        await Database_1.default.getInstance();
    }
}
exports.default = Application;
_Application_express = new WeakMap();
//# sourceMappingURL=app.js.map