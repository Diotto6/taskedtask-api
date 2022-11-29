"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTableUser1656693649816 = void 0;
const typeorm_1 = require("typeorm");
class CreateTableUser1656693649816 {
    async up(queryRunner) {
        await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
        await queryRunner.createTable(new typeorm_1.Table({
            name: "user",
            columns: [
                {
                    name: "id",
                    type: "uuid",
                    isPrimary: true,
                    isNullable: false,
                    generationStrategy: "uuid",
                    default: "uuid_generate_v4()",
                },
                {
                    name: "firstName",
                    type: "varchar",
                    isNullable: true,
                },
                {
                    name: "lastName",
                    type: "varchar",
                    isNullable: true,
                },
                {
                    name: "email",
                    type: "varchar",
                    isNullable: false,
                },
                {
                    name: "password",
                    type: "varchar",
                    isNullable: false,
                },
                {
                    name: "passwordConfirm",
                    type: "varchar",
                    isNullable: false,
                },
            ],
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable("user", true, true, true);
        await queryRunner.query('DROP EXTENSION "uuid-ossp"');
    }
}
exports.CreateTableUser1656693649816 = CreateTableUser1656693649816;
//# sourceMappingURL=1656693649816-CreateTableUser.js.map