import { MigrationInterface, QueryRunner } from 'typeorm';

export class SEEDING1635087932461 implements MigrationInterface {
  name = 'SEEDING1635087932461';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO "profile"."profile"("userId","name","gender","birthDate")
      SELECT 
          userId,
          substr(md5(random()::text), 0, 6) AS name,
          substr(md5(random()::text), 0, 2) AS gender,
          timestamp '1970-01-01 00:00:01' +
          random() * (timestamp '1970-01-01 00:00:01' -
          timestamp '2038-01-19 03:14:07') AS birthDate
      FROM 
          generate_series(1,100) AS y(userId)
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    DELETE FROM 
      "profile"."profile"
    WHERE id in (SELECT id FROM "profile"."profile" order by id asc limit 100);
    `);
  }
}
