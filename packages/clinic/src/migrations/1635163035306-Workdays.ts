import { MigrationInterface, QueryRunner } from 'typeorm';

export class Workdays1635163035306 implements MigrationInterface {
  name = 'Workdays1635163035306';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "appointments"."workday" 
        (
          "id" SERIAL NOT NULL,
          "date" TIMESTAMP NOT NULL,
          "doctorId" integer NOT NULL,
          CONSTRAINT "PK_workdays" PRIMARY KEY ("id")
        )
      `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "appointments"."workday"`);
  }
}
