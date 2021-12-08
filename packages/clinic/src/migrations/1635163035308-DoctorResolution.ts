import { MigrationInterface, QueryRunner } from 'typeorm';

export class DoctorResolution1635163035308 implements MigrationInterface {
  name = 'DoctorResolution1635163035308';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "doctors"."resolution" 
      ADD CONSTRAINT "FK_resolution_doctor" FOREIGN KEY ("doctorId") 
      REFERENCES "doctors"."doctor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "doctors"."resolution" DROP CONSTRAINT "FK_resolution_doctor"`,
    );
  }
}
