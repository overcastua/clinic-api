import { MigrationInterface, QueryRunner } from 'typeorm';

export class SEEDING1635004523634 implements MigrationInterface {
  name = 'SEEDING1635004523634';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    INSERT INTO "identity"."user"("email","password") VALUES 
        ('u1@test.com','$2b$10$2KUArK1Cy1dUvz3PLvZ1kO88S3awM1M6UKKcO2SGfmbE/U782o2d.'),
        ('u2@test.com','$2b$10$2KUArK1Cy1dUvz3PLvZ1kO88S3awM1M6UKKcO2SGfmbE/U782o2d.'),
        ('u3@test.com','$2b$10$2KUArK1Cy1dUvz3PLvZ1kO88S3awM1M6UKKcO2SGfmbE/U782o2d.'),
        ('u4@test.com','$2b$10$2KUArK1Cy1dUvz3PLvZ1kO88S3awM1M6UKKcO2SGfmbE/U782o2d.'),
        ('u5@test.com','$2b$10$2KUArK1Cy1dUvz3PLvZ1kO88S3awM1M6UKKcO2SGfmbE/U782o2d.');
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    DELETE FROM "identity"."user"
    `);
  }
}
