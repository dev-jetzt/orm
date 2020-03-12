import {MigrationInterface, QueryRunner} from "typeorm";

export class initial1584016591758 implements MigrationInterface {
    name = 'initial1584016591758'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "chat" ("id" SERIAL NOT NULL, CONSTRAINT "PK_9d0b2ba74336710fd31154738a5" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "chat_message" ("id" SERIAL NOT NULL, CONSTRAINT "PK_3cc0d85193aade457d3077dd06b" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`, undefined);
        await queryRunner.query(`DROP TABLE "chat_message"`, undefined);
        await queryRunner.query(`DROP TABLE "chat"`, undefined);
    }

}
