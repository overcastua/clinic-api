import { MigrationInterface, QueryRunner } from 'typeorm';

export class DoctorsSeeding1635163035320 implements MigrationInterface {
  name = 'DoctorsSeeding1635163035320';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    INSERT INTO "doctors"."doctor"("userId","specializationId") VALUES 
        (1,1),
        (2,2),
        (3,2),
        (4,3),
        (5,1);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    DELETE FROM 
      "doctors"."doctor"
    WHERE id in (SELECT id FROM "doctors"."doctor" order by id asc limit 5);
    `);
  }
}
