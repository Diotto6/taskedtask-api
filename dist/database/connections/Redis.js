"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ioredis_1 = __importDefault(require("ioredis"));
require("dotenv/config");
class Redis {
    constructor() { }
    static getInstance() {
        if (!Redis.instance) {
            const redis = new Redis();
            Redis.instance = redis.openConnection();
        }
        return Redis.instance;
    }
    openConnection() {
        try {
            return new ioredis_1.default(process.env.REDIS_URL, {
                password: process.env.REDIS_PASSWORD,
            });
        }
        catch (error) {
            throw new Error(`Erro ao conectar no Redis: ${error}`);
        }
    }
}
exports.default = Redis;
//# sourceMappingURL=Redis.js.map