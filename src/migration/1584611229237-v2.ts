import {MigrationInterface, QueryRunner} from "typeorm";

export class v21584611229237 implements MigrationInterface {
    name = 'v21584611229237'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "chat_users_user" ("chatId" integer NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_c6af481280fb886733ddbd73661" PRIMARY KEY ("chatId", "userId"))`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_6a573fa22dfa3574496311588c" ON "chat_users_user" ("chatId") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_2004be39e2b3044c392bfe3e61" ON "chat_users_user" ("userId") `, undefined);
        await queryRunner.query(`ALTER TABLE "user" ADD "username" character varying NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "user" ADD "firstName" character varying NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "user" ADD "lastName" character varying NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "chat_message" ADD "content" character varying NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "chat_message" ADD "userId" integer`, undefined);
        await queryRunner.query(`ALTER TABLE "chat_message" ADD "chatId" integer`, undefined);
        await queryRunner.query(`ALTER TABLE "chat" ADD "name" character varying NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "chat_message" ADD CONSTRAINT "FK_a44ec486210e6f8b4591776d6f3" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "chat_message" ADD CONSTRAINT "FK_6d2db5b1118d92e561f5ebc1af0" FOREIGN KEY ("chatId") REFERENCES "chat"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "chat_users_user" ADD CONSTRAINT "FK_6a573fa22dfa3574496311588c7" FOREIGN KEY ("chatId") REFERENCES "chat"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "chat_users_user" ADD CONSTRAINT "FK_2004be39e2b3044c392bfe3e617" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chat_users_user" DROP CONSTRAINT "FK_2004be39e2b3044c392bfe3e617"`, undefined);
        await queryRunner.query(`ALTER TABLE "chat_users_user" DROP CONSTRAINT "FK_6a573fa22dfa3574496311588c7"`, undefined);
        await queryRunner.query(`ALTER TABLE "chat_message" DROP CONSTRAINT "FK_6d2db5b1118d92e561f5ebc1af0"`, undefined);
        await queryRunner.query(`ALTER TABLE "chat_message" DROP CONSTRAINT "FK_a44ec486210e6f8b4591776d6f3"`, undefined);
        await queryRunner.query(`ALTER TABLE "chat" DROP COLUMN "name"`, undefined);
        await queryRunner.query(`ALTER TABLE "chat_message" DROP COLUMN "chatId"`, undefined);
        await queryRunner.query(`ALTER TABLE "chat_message" DROP COLUMN "userId"`, undefined);
        await queryRunner.query(`ALTER TABLE "chat_message" DROP COLUMN "content"`, undefined);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "lastName"`, undefined);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "firstName"`, undefined);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "username"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_2004be39e2b3044c392bfe3e61"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_6a573fa22dfa3574496311588c"`, undefined);
        await queryRunner.query(`DROP TABLE "chat_users_user"`, undefined);
    }

}
