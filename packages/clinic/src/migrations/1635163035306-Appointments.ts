import { MigrationInterface, QueryRunner } from 'typeorm';

export class Appointments1635163035306 implements MigrationInterface {
  name = 'Appointments1635163035306';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "appointments"."slot" 
        (
          "id" SERIAL NOT NULL, 
          "time" character varying NOT NULL, 
          "isFree" boolean NOT NULL DEFAULT true, 
          "isFinished" boolean NOT NULL DEFAULT false, 
          "patientId" integer, 
          "workdayId" integer NOT NULL,
          CONSTRAINT "PK_slots" PRIMARY KEY ("id")
        )
      `,
    );
    await queryRunner.query(
      `CREATE TABLE "appointments"."workday" 
        (
          "id" SERIAL NOT NULL,
          "date" TIMESTAMP NOT NULL,
          "doctorId" integer NOT NULL,
          CONSTRAINT "PK_workdays" PRIMARY KEY ("id")
        )
      `,
    );
    await queryRunner.query(
      `ALTER TABLE "appointments"."workday"
      ADD CONSTRAINT "FK_workday_doctor" FOREIGN KEY ("doctorId") 
      REFERENCES "doctors"."doctor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "appointments"."slot"
      ADD CONSTRAINT "FK_slot_patient" FOREIGN KEY ("patientId") 
      REFERENCES "patients"."patient"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "appointments"."slot"
      ADD CONSTRAINT "FK_workday_slot" FOREIGN KEY ("workdayId") 
      REFERENCES "appointments"."workday"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "appointments"."slot"
        DROP CONSTRAINT "FK_workday_slot"`,
    );
    await queryRunner.query(
      `ALTER TABLE "appointments"."slot"
        DROP CONSTRAINT "FK_slot_patient"`,
    );
    await queryRunner.query(
      `ALTER TABLE "appointments"."workday"
        DROP CONSTRAINT "FK_workday_doctor"`,
    );
    await queryRunner.query(`DROP TABLE "appointments"."workday"`);
    await queryRunner.query(`DROP TABLE "appointments"."slot"`);
  }
}
