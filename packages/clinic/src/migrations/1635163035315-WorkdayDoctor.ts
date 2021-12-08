import { MigrationInterface, QueryRunner } from 'typeorm';

export class WorkdayDoctor1635163035315 implements MigrationInterface {
  name = 'WorkdayDoctor1635163035315';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "appointments"."workday"
      ADD CONSTRAINT "FK_workday_doctor" FOREIGN KEY ("doctorId") 
      REFERENCES "doctors"."doctor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "appointments"."workday"
        DROP CONSTRAINT "FK_workday_doctor"`,
    );
  }
}
