import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateUsersTable1606702023606 implements MigrationInterface {
    name = 'CreateUsersTable1606702023606'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "users_role_enum" AS ENUM('doctor', 'patient')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "account" character varying NOT NULL, "password" character varying NOT NULL, "role" "users_role_enum" NOT NULL DEFAULT 'patient', "created_at" integer NOT NULL, "updated_at" integer NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "users_role_enum"`);
    }

}
