import { MigrationInterface, QueryRunner } from 'typeorm';

export class Queues1635163035303 implements MigrationInterface {
  name = 'Queues1635163035303';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "queues"."position" 
        (
          "id" SERIAL NOT NULL, 
          "createdAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, 
          "patientId" integer, 
          "queueId" integer, 
          CONSTRAINT "PK_queuePos" PRIMARY KEY ("id")
        )
      `,
    );
    await queryRunner.query(
      `CREATE TABLE "queues"."queue" 
        (
          "id" SERIAL NOT NULL, 
          CONSTRAINT "PK_queue" PRIMARY KEY ("id")
        )
      `,
    );
    await queryRunner.query(
      `ALTER TABLE "queues"."position" 
      ADD CONSTRAINT "FK_position_patient" FOREIGN KEY ("patientId") 
      REFERENCES "patients"."patient"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "queues"."position" 
      ADD CONSTRAINT "FK_position_queue" FOREIGN KEY ("queueId") 
      REFERENCES "queues"."queue"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "queues"."position" DROP CONSTRAINT "FK_position_queue"`,
    );
    await queryRunner.query(
      `ALTER TABLE "queues"."position" DROP CONSTRAINT "FK_position_patient"`,
    );
    await queryRunner.query(`DROP TABLE "queues"."queue"`);
    await queryRunner.query(`DROP TABLE "queues"."position"`);
  }
}
