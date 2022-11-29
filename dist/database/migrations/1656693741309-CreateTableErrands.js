"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTableErrands1656693741309 = void 0;
const typeorm_1 = require("typeorm");
class CreateTableErrands1656693741309 {
    async up(queryRunner) {
        await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
        await queryRunner.createTable(new typeorm_1.Table({
            name: "errands",
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
                    name: "message",
                    type: "varchar",
                    isNullable: false,
                },
                {
                    name: "userId",
                    type: "uuid",
                    isNullable: true,
                },
            ],
            foreignKeys: [
                new typeorm_1.TableForeignKey({
                    referencedColumnNames: ["id"],
                    referencedTableName: "user",
                    columnNames: ["userId"],
                }),
            ],
        }));
    }
    async down(queryRunner) {
        await queryRunner.dropTable("errands", true, true, true);
        await queryRunner.query('DROP EXTENSION "uuid-ossp"');
    }
}
exports.CreateTableErrands1656693741309 = CreateTableErrands1656693741309;
//# sourceMappingURL=1656693741309-CreateTableErrands.js.map