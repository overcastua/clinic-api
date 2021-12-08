import { MigrationInterface, QueryRunner } from 'typeorm';

export class ROLES1635163035303 implements MigrationInterface {
  name = 'ROLES1635163035303';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    BEGIN;

    DROP ROLE IF EXISTS patients_writer;
    DROP ROLE IF EXISTS patients_reader;

    DROP ROLE IF EXISTS appointments_writer;
    DROP ROLE IF EXISTS appointments_reader;

    DROP ROLE IF EXISTS doctors_writer;
    DROP ROLE IF EXISTS doctors_reader;

    CREATE ROLE patients_reader;
    CREATE ROLE patients_writer;

    CREATE ROLE appointments_writer;
    CREATE ROLE appointments_reader;

    CREATE ROLE doctors_writer;
    CREATE ROLE doctors_reader;

    COMMIT;
    `);

    await queryRunner.query(`
    BEGIN;

    GRANT CONNECT ON DATABASE med TO patients_writer;
    GRANT CONNECT ON DATABASE med TO patients_reader;
    
    GRANT CONNECT ON DATABASE med TO appointments_writer;
    GRANT CONNECT ON DATABASE med TO appointments_reader;
    
    GRANT CONNECT ON DATABASE med TO doctors_writer;
    GRANT CONNECT ON DATABASE med TO doctors_reader;
    
    GRANT SELECT ON ALL TABLES IN SCHEMA patients TO patients_reader;
    GRANT INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA patients TO patients_writer;
    
    GRANT SELECT ON ALL TABLES IN SCHEMA appointments TO appointments_reader;
    GRANT INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA appointments TO appointments_writer;
    
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
