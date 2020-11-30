import {MigrationInterface, QueryRunner} from "typeorm";

export class CreatePrescriptionTables1606752904067 implements MigrationInterface {
    name = 'CreatePrescriptionTables1606752904067'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "prescriptions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" integer NOT NULL, "updated_at" integer NOT NULL, "pacientId" uuid, "doctorId" uuid, CONSTRAINT "PK_097b2cc2f2b7e56825468188503" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "prescriptions_medications_medications" ("prescriptionsId" uuid NOT NULL, "medicationsId" uuid NOT NULL, CONSTRAINT "PK_f8f61c3feb51f83f40f1e7fcaa0" PRIMARY KEY ("prescriptionsId", "medicationsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_35be3eb4318c96ce51f9746efd" ON "prescriptions_medications_medications" ("prescriptionsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_330e511e1e1eb7154982c471ef" ON "prescriptions_medications_medications" ("medicationsId") `);
        await queryRunner.query(`ALTER TABLE "prescriptions" ADD CONSTRAINT "FK_20d3a81d160a03457991e7f7d1c" FOREIGN KEY ("pacientId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "prescriptions" ADD CONSTRAINT "FK_42c70415fad4505386e6d7e9dc4" FOREIGN KEY ("doctorId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "prescriptions_medications_medications" ADD CONSTRAINT "FK_35be3eb4318c96ce51f9746efd8" FOREIGN KEY ("prescriptionsId") REFERENCES "prescriptions"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "prescriptions_medications_medications" ADD CONSTRAINT "FK_330e511e1e1eb7154982c471ef7" FOREIGN KEY ("medicationsId") REFERENCES "medications"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "prescriptions_medications_medications" DROP CONSTRAINT "FK_330e511e1e1eb7154982c471ef7"`);
        await queryRunner.query(`ALTER TABLE "prescriptions_medications_medications" DROP CONSTRAINT "FK_35be3eb4318c96ce51f9746efd8"`);
        await queryRunner.query(`ALTER TABLE "prescriptions" DROP CONSTRAINT "FK_42c70415fad4505386e6d7e9dc4"`);
        await queryRunner.query(`ALTER TABLE "prescriptions" DROP CONSTRAINT "FK_20d3a81d160a03457991e7f7d1c"`);
        await queryRunner.query(`DROP INDEX "IDX_330e511e1e1eb7154982c471ef"`);
        await queryRunner.query(`DROP INDEX "IDX_35be3eb4318c96ce51f9746efd"`);
        await queryRunner.query(`DROP TABLE "prescriptions_medications_medications"`);
        await queryRunner.query(`DROP TABLE "prescriptions"`);
    }

}
