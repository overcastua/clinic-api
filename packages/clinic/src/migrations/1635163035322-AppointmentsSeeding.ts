import { MigrationInterface, QueryRunner } from 'typeorm';

export class AppointmentsSeeding1635163035322 implements MigrationInterface {
  name = 'AppointmentsSeeding1635163035322';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    INSERT INTO 
      "appointments"."workday"("date","doctorId")
    VALUES
      ('2021-10-11', 1),
      ('2021-10-12', 1),
      ('2021-10-13', 2),
      ('2021-10-15', 2),
      ('2021-10-11', 3),
      ('2021-10-13', 3),
      ('2021-10-14', 4),
      ('2021-10-12', 5),
      ('2021-10-11', 5),
      ('2021-10-12', 5);
    `);
    await queryRunner.query(`
    INSERT INTO 
      "appointments"."slot"("time","workdayId")
    VALUES
      ('10:00', 1),
      ('10:00', 1),
      ('12:00', 1),
      ('13:00', 1),
      ('14:00', 1),
      ('15:00', 1),
      ('16:00', 1),
      ('17:00', 1),
      ('18:00', 1),
      ('11:00', 2),
      ('12:00', 2),
      ('13:00', 2),
      ('14:00', 3),
      ('11:00', 3),
      ('12:00', 5),
      ('13:00', 5),
      ('16:00', 7),
      ('15:00', 7);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    DELETE FROM 
      "appointments"."workday" 
    WHERE id in (SELECT id FROM "appointments"."workday" order by id asc limit 10)
    `);
    await queryRunner.query(`
    DELETE FROM 
      "appointments"."slot" 
    WHERE id in (SELECT id FROM "appointments"."slot" order by id asc limit 10)
    `);
  }
}
