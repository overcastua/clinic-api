import { MigrationInterface, QueryRunner } from 'typeorm';

export class SlotPatient1635163035316 implements MigrationInterface {
  name = 'SlotPatient1635163035316';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "appointments"."slot"
      ADD CONSTRAINT "FK_slot_patient" FOREIGN KEY ("patientId") 
      REFERENCES "patients"."patient"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "appointments"."slot"
        DROP CONSTRAINT "FK_slot_patient"`,
    );

    await queryRunner.query(`DROP TABLE "appointments"."workday"`);
    await queryRunner.query(`DROP TABLE "appointments"."slot"`);
  }
}
