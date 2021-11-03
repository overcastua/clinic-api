import { MigrationInterface, QueryRunner } from 'typeorm';

export class PatientsSeeding1635163035321 implements MigrationInterface {
  name = 'PatientsSeeding1635163035321';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    INSERT INTO "patients"."patient"("userId") VALUES 
        (1),
        (5);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    DELETE FROM "patients"."patient"
    `);
  }
}
