import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMigration1680639135045 implements MigrationInterface {
    name = 'NewMigration1680639135045'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" DROP CONSTRAINT "FK_5cf832f393988f554a1371fa561"`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "uuid" SET DEFAULT '768b0b44-a82d-4a35-8268-e5a471b49b02'`);
        await queryRunner.query(`ALTER TABLE "post" ADD CONSTRAINT "FK_5cf832f393988f554a1371fa561" FOREIGN KEY ("userUuid") REFERENCES "user"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post" DROP CONSTRAINT "FK_5cf832f393988f554a1371fa561"`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "uuid" SET DEFAULT 'f7eae3af-d1e5-42fa-b240-0fb79dab607a'`);
        await queryRunner.query(`ALTER TABLE "post" ADD CONSTRAINT "FK_5cf832f393988f554a1371fa561" FOREIGN KEY ("userUuid") REFERENCES "user"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
