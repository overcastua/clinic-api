import { MigrationInterface, QueryRunner } from 'typeorm';

export class Patients1635163035302 implements MigrationInterface {
  name = 'Patients1635163035302';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "patients"."patient" 
        (
          "id" SERIAL NOT NULL, 
          "userId" integer NOT NULL, 
          "createdAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, 
          CONSTRAINT "UQ_patient_user" UNIQUE ("userId"), 
          CONSTRAINT "PK_patient" PRIMARY KEY ("id")
        )
      `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "patients"."patient"`);
  }
}
