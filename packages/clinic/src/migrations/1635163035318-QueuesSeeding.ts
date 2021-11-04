import { MigrationInterface, QueryRunner } from 'typeorm';

export class QueuesSeeding1635163035318 implements MigrationInterface {
  name = 'QueuesSeeding1635163035318';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    INSERT INTO "queues"."queue" SELECT generate_series(1,5);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    DELETE FROM 
      "queues"."queue" 
    WHERE id in (SELECT id FROM "queues"."queue"  order by id asc limit 5)
    `);
  }
}
