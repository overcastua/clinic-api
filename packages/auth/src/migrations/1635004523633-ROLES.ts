import { MigrationInterface, QueryRunner } from 'typeorm';

export class ROLES1635163035306 implements MigrationInterface {
  name = 'ROLES1635163035306';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    BEGIN;

    DROP ROLE IF EXISTS users_writer;
    DROP ROLE IF EXISTS users_reader;

    CREATE ROLE users_reader;
    CREATE ROLE users_writer;

    COMMIT;
    `);

    await queryRunner.query(`
    BEGIN;

    GRANT CONNECT ON DATABASE med TO users_writer;
    GRANT CONNECT ON DATABASE med TO users_reader;
    
    GRANT SELECT ON ALL TABLES IN SCHEMA identity TO users_reader;
    GRANT INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA identity TO users_writer;

    COMMIT;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    BEGIN;

    DROP ROLE IF EXISTS users_writer;
    DROP ROLE IF EXISTS users_reader;

    COMMIT;
    `);
  }
}
