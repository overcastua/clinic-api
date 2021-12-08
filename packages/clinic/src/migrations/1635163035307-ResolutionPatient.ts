import { MigrationInterface, QueryRunner } from 'typeorm';

export class ResolutionPatient1635163035307 implements MigrationInterface {
  name = 'ResolutionPatient1635163035307';

  public async up(queryRunner: QueryRunner): Promise<void> {
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
  }
}
