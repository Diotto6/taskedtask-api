"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CacheRepository = void 0;
const Redis_1 = __importDefault(require("../connections/Redis"));
class CacheRepository {
    constructor() {
        this.redis = Redis_1.default.getInstance();
    }
    async set(key, value) {
        await this.redis.set(key, JSON.stringify(value));
    }
    async setEx(key, value, ttl) {
        await this.redis.set(key, JSON.stringify(value), "EX", 15);
    }
    async get(key) {
        const result = await this.redis.get(key);
        if (result === null)
            return undefined;
        return JSON.parse(result);
    }
    async delete(key) {
        const result = await this.redis.del(key);
        return result !== 0;
    }
}
exports.CacheRepository = CacheRepository;
//# sourceMappingURL=cache.js.map