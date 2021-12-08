import { MigrationInterface, QueryRunner } from 'typeorm';

export class Timeslots1635163035310 implements MigrationInterface {
  name = 'Timeslots1635163035310';

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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "appointments"."slot"`);
  }
}
