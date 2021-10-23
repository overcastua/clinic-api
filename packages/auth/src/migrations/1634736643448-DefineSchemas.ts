import { MigrationInterface, QueryRunner } from 'typeorm';

export class DefineSchemas1634736643448 implements MigrationInterface {
  name = 'DefineSchemas1634736643448';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE SCHEMA IF NOT EXISTS "profile"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP SCHEMA IF EXISTS "profile"`);
  }
}
