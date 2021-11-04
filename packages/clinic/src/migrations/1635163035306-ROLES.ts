import { MigrationInterface, QueryRunner } from 'typeorm';

export class ROLES1635163035306 implements MigrationInterface {
  name = 'ROLES1635163035306';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    BEGIN;

    DROP ROLE IF EXISTS patients_writer;
    DROP ROLE IF EXISTS patients_reader;

    DROP ROLE IF EXISTS queues_writer;
    DROP ROLE IF EXISTS queues_reader;

    DROP ROLE IF EXISTS doctors_writer;
    DROP ROLE IF EXISTS doctors_reader;

    CREATE ROLE patients_reader;
    CREATE ROLE patients_writer;

    CREATE ROLE queues_writer;
    CREATE ROLE queues_reader;

    CREATE ROLE doctors_writer;
    CREATE ROLE doctors_reader;

    COMMIT;
    `);

    await queryRunner.query(`
    BEGIN;

    GRANT CONNECT ON DATABASE med TO patients_writer;
    GRANT CONNECT ON DATABASE med TO patients_reader;
    
    GRANT CONNECT ON DATABASE med TO queues_writer;
    GRANT CONNECT ON DATABASE med TO queues_reader;
    
    GRANT CONNECT ON DATABASE med TO doctors_writer;
    GRANT CONNECT ON DATABASE med TO doctors_reader;
    
    GRANT SELECT ON ALL TABLES IN SCHEMA patients TO patients_reader;
    GRANT INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA patients TO patients_writer;
    
    GRANT SELECT ON ALL TABLES IN SCHEMA queues TO queues_reader;
    GRANT INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA queues TO queues_writer;
    
    GRANT SELECT ON ALL TABLES IN SCHEMA doctors TO doctors_reader;
    GRANT INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA doctors TO doctors_writer;

    COMMIT;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    BEGIN;

    DROP ROLE IF EXISTS patients_writer;
    DROP ROLE IF EXISTS patients_reader;

    DROP ROLE IF EXISTS queues_writer;
    DROP ROLE IF EXISTS queues_reader;

    DROP ROLE IF EXISTS doctors_writer;
    DROP ROLE IF EXISTS doctors_reader;

    COMMIT;
    `);
  }
}
