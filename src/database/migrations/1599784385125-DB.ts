import {MigrationInterface, QueryRunner} from "typeorm";

export class DB1599784385125 implements MigrationInterface {
    name = 'DB1599784385125'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_e946a7369177d008640fa64f1ff"`);
        await queryRunner.query(`CREATE TABLE "user_module" ("userId" uuid NOT NULL, "moduleId" uuid NOT NULL, CONSTRAINT "PK_dde5b948fb92b25617707cf5b65" PRIMARY KEY ("userId", "moduleId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_f4392b5a6426d6c5610cbf709e" ON "user_module" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_a961f471f29276067738052d63" ON "user_module" ("moduleId") `);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "moduleId"`);
        await queryRunner.query(`ALTER TABLE "user_module" ADD CONSTRAINT "FK_f4392b5a6426d6c5610cbf709ea" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_module" ADD CONSTRAINT "FK_a961f471f29276067738052d633" FOREIGN KEY ("moduleId") REFERENCES "module"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_module" DROP CONSTRAINT "FK_a961f471f29276067738052d633"`);
        await queryRunner.query(`ALTER TABLE "user_module" DROP CONSTRAINT "FK_f4392b5a6426d6c5610cbf709ea"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "moduleId" uuid`);
        await queryRunner.query(`DROP INDEX "IDX_a961f471f29276067738052d63"`);
        await queryRunner.query(`DROP INDEX "IDX_f4392b5a6426d6c5610cbf709e"`);
        await queryRunner.query(`DROP TABLE "user_module"`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_e946a7369177d008640fa64f1ff" FOREIGN KEY ("moduleId") REFERENCES "module"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
