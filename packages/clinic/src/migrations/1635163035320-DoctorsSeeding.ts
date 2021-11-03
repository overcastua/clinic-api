import { MigrationInterface, QueryRunner } from 'typeorm';

export class DoctorsSeeding1635163035320 implements MigrationInterface {
  name = 'DoctorsSeeding1635163035320';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    INSERT INTO "doctors"."doctor"("userId","specializationId", "queueId") VALUES 
        (1,1,1),
        (2,2,2),
        (3,2,3),
        (4,3,4),
        (5,1,5);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    DELETE FROM "doctors"."doctor"
    `);
  }
}
