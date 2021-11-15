import { MigrationInterface, QueryRunner } from 'typeorm';
export class SEEDING1635004523634 implements MigrationInterface {
  name = 'SEEDING1635004523634';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO "identity"."user"("email","password")
      SELECT 
        'person'|| num ||'@test.com' AS email, 
        '$2b$10$2KUArK1Cy1dUvz3PLvZ1kO88S3awM1M6UKKcO2SGfmbE/U782o2d.' AS password
      FROM 
          generate_series(1,1000000) as y(num)
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    DELETE FROM 
      "identity"."user" 
    WHERE id in (SELECT id FROM "identity"."user" order by id asc limit 1000000);
    `);
  }
}
