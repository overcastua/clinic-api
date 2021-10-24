import { MigrationInterface, QueryRunner } from 'typeorm';

export class DefineSchemas1634736643448 implements MigrationInterface {
  name = 'DefineSchemas1634736643448';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE SCHEMA IF NOT EXISTS "profile"`);
    await queryRunner.query(`CREATE SCHEMA IF NOT EXISTS "patients"`);
    await queryRunner.query(`CREATE SCHEMA IF NOT EXISTS "queues"`);
    await queryRunner.query(`CREATE SCHEMA IF NOT EXISTS "doctors"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP SCHEMA IF EXISTS "profile"`);
    await queryRunner.query(`DROP SCHEMA IF EXISTS "patients"`);
    await queryRunner.query(`DROP SCHEMA IF EXISTS "queues"`);
    await queryRunner.query(`DROP SCHEMA IF EXISTS "doctors"`);
  }
}
