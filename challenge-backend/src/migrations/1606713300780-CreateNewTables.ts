import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateNewTables1606713300780 implements MigrationInterface {
    name = 'CreateNewTables1606713300780'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "medication_interactions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "drug_one" character varying NOT NULL, "drug_two" character varying NOT NULL, "risk" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_13acf7247cdb9fd8d16404b13d9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "medications" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "medication_id" integer NOT NULL, "name" character varying NOT NULL, "administer" character varying NOT NULL, "concentration" character varying NOT NULL, CONSTRAINT "PK_cdee49fe7cd79db13340150d356" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "drugs" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "medications" uuid, CONSTRAINT "PK_a3788abdeb2ec977862b17351ad" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "drugs" ADD CONSTRAINT "FK_1f3a7804ddbb58cd0c2a31bacb9" FOREIGN KEY ("medications") REFERENCES "medications"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "drugs" DROP CONSTRAINT "FK_1f3a7804ddbb58cd0c2a31bacb9"`);
        await queryRunner.query(`DROP TABLE "drugs"`);
        await queryRunner.query(`DROP TABLE "medications"`);
        await queryRunner.query(`DROP TABLE "medication_interactions"`);
    }

}
