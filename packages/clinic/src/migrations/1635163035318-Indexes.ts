import { MigrationInterface, QueryRunner } from 'typeorm';

export class Indexes1635163035318 implements MigrationInterface {
  name = 'Indexes1635163035318';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE INDEX "idx_doctor_id" 
          ON "appointments"."workday"("doctorId");`,
    );
    await queryRunner.query(
      `CREATE INDEX "idx_patient_id" 
          ON "appointments"."slot"("patientId");`,
    );
    await queryRunner.query(
      `CREATE INDEX "idx_patient_id_exp" 
          ON "doctors"."resolution"("patientId", "expiresIn");`,
    );
    await queryRunner.query(
      `CREATE INDEX "idx_doctor_id" 
          ON "doctors"."resolution"("doctorId");`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "idx_doctor_id";`);
    await queryRunner.query(`DROP INDEX "idx_patient_id";`);
    await queryRunner.query(`DROP INDEX "idx_patient_id_exp";`);
    await queryRunner.query(`DROP INDEX "idx_doctor_id";`);
  }
}
