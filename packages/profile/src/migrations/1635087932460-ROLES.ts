import { MigrationInterface, QueryRunner } from 'typeorm';

export class ROLES1635087932460 implements MigrationInterface {
  name = 'ROLES1635087932460';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    BEGIN;

    DROP ROLE IF EXISTS profiles_writer;
    DROP ROLE IF EXISTS profiles_reader;

    CREATE ROLE profiles_reader;
    CREATE ROLE profiles_writer;

    COMMIT;
    `);

    await queryRunner.query(`
    BEGIN;

    GRANT CONNECT ON DATABASE med TO profiles_writer;
    GRANT CONNECT ON DATABASE med TO profiles_reader;
    
    GRANT SELECT ON ALL TABLES IN SCHEMA profile TO profiles_reader;
    GRANT INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA profile TO profiles_writer;

    COMMIT;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    BEGIN;

    DROP ROLE IF EXISTS profiles_writer;
    DROP ROLE IF EXISTS profiles_reader;

    COMMIT;
    `);
  }
}
