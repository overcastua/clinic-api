import { MigrationInterface, QueryRunner } from 'typeorm';

export class SEEDING1635087932461 implements MigrationInterface {
  name = 'SEEDING1635087932461';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    INSERT INTO "profile"."profile"("name","gender","birthDate", "userId") VALUES 
        ('Jacob','male','2021-08-09 13:57:40',1),
        ('Jessica','female','2021-08-09 13:57:40',2),
        ('Ian','male','2021-08-09 13:57:40',3),
        ('Ann','female','2021-08-09 13:57:40',4),
        ('Kate','female','2021-08-09 13:57:40',5);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    DELETE FROM "profile"."profile"
    `);
  }
}
