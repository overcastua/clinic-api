import { MigrationInterface, QueryRunner } from 'typeorm';

export class DefineSchemas1635087932458 implements MigrationInterface {
  name = 'DefineSchemas1635087932458';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE SCHEMA IF NOT EXISTS "profile"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP SCHEMA IF EXISTS "profile"`);
  }
}
