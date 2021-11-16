import { MigrationInterface, QueryRunner } from 'typeorm';

export class SlotWorkday1635163035317 implements MigrationInterface {
  name = 'SlotWorkday1635163035317';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "appointments"."slot"
      ADD CONSTRAINT "FK_workday_slot" FOREIGN KEY ("workdayId") 
      REFERENCES "appointments"."workday"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "appointments"."slot"
        DROP CONSTRAINT "FK_workday_slot"`,
    );
  }
}
