import { MigrationInterface, QueryRunner } from 'typeorm';

export class SpecSeeding1635163035319 implements MigrationInterface {
  name = 'SpecSeeding1635163035319';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    INSERT INTO "doctors"."specialization"("title") VALUES 
        ('Radiologist'),
        ('Gastroenterologist'),
        ('Hematologist');
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    DELETE FROM 
      "doctors"."specialization"
    WHERE id in (SELECT id FROM "doctors"."specialization" order by id asc limit 3);
    `);
  }
}
