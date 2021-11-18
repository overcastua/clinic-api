import { MigrationInterface, QueryRunner } from 'typeorm';

export class PatientsSeeding1635163035321 implements MigrationInterface {
  name = 'PatientsSeeding1635163035321';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    INSERT INTO "patients"."patient"("userId")
    SELECT 
        userId
    FROM 
        generate_series(1,100) AS y(userId)
  `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    DELETE FROM 
      "patients"."patient"
    WHERE id in (SELECT id FROM "patients"."patient" order by id asc limit 100)
    `);
  }
}
