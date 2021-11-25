import { MigrationInterface, QueryRunner } from 'typeorm';

export class ResolutionsSeeding1635163035323 implements MigrationInterface {
  name = 'ResolutionsSeeding1635163035323';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `
      INSERT INTO 
        "doctors"."resolution"("text","expiresIn","patientId","doctorId")
      SELECT 
        substr(md5(random()::text), 0, 25) AS text,
        to_timestamp('2038-01-19 03:14:07', 'YYYY-MM-DD hh24:mi:ss')::timestamp as expiresIn,
        CASE WHEN num % 10 = 0 THEN 1
            ELSE NULL
        END patientId,
        2 as doctorId
      FROM 
        generate_series(1,100) AS y(num)
        `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    DELETE FROM 
      "doctors"."resolution" 
    WHERE id in (SELECT id FROM "doctors"."resolution" order by id asc limit 100)
    `);
  }
}
