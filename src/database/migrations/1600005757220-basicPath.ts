import {MigrationInterface, QueryRunner} from "typeorm";

export class basicPath1600005757220 implements MigrationInterface {
    name = 'basicPath1600005757220'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "company" ADD "basicPath" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "company" DROP COLUMN "basicPath"`);
    }

}
