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
    await queryRunner.query(
      `ALTER TABLE "doctors"."resolution"
      ADD CONSTRAINT "FK_resolution_patient" FOREIGN KEY ("patientId")
      REFERENCES "patients"."patient"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "doctors"."resolution" DROP CONSTRAINT "FK_resolution_patient"`,
    );
    await queryRunner.query(`DROP TABLE "patients"."patient"`);
  }
}
