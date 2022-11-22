"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrandEntity = void 0;
const typeorm_1 = require("typeorm");
const user_1 = require("./user");
let ErrandEntity = class ErrandEntity extends typeorm_1.BaseEntity {
    constructor(message, userId) {
        super();
        this.message = message;
        this.userId = userId;
    }
};
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", Number)
], ErrandEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ErrandEntity.prototype, "message", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'userId' }),
    __metadata("design:type", String)
], ErrandEntity.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_1.UserEntity, (user) => user.errands),
    (0, typeorm_1.JoinColumn)({ name: 'userId', referencedColumnName: 'id' }),
    __metadata("design:type", user_1.UserEntity)
], ErrandEntity.prototype, "user", void 0);
ErrandEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'errands' }),
    __metadata("design:paramtypes", [String, String])
], ErrandEntity);
exports.ErrandEntity = ErrandEntity;
//# sourceMappingURL=errands.js.map