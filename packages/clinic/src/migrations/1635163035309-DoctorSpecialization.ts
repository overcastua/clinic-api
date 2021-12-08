import { MigrationInterface, QueryRunner } from 'typeorm';

export class DoctorSpecialization1635163035309 implements MigrationInterface {
  name = 'DoctorSpecialization1635163035309';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "doctors"."doctor" 
      ADD CONSTRAINT "FK_doctor_specialization" FOREIGN KEY ("specializationId") 
      REFERENCES "doctors"."specialization"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "doctors"."doctor" DROP CONSTRAINT "FK_doctor_specialization"`,
    );
  }
}
