import {MigrationInterface, QueryRunner} from "typeorm";

export class emailCompany1599786729852 implements MigrationInterface {
    name = 'emailCompany1599786729852'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "company" RENAME COLUMN "name" TO "email"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "company" RENAME COLUMN "email" TO "name"`);
    }

}
