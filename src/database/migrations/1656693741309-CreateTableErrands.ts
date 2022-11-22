import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CreateTableErrands1656693741309 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
    await queryRunner.createTable(
      new Table({
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
          new TableForeignKey({
            referencedColumnNames: ["id"],
            referencedTableName: "user",
            columnNames: ["userId"],
          }),
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("errands", true, true, true);
    await queryRunner.query('DROP EXTENSION "uuid-ossp"');
  }
}
