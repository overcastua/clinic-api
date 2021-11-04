import { MigrationInterface, QueryRunner } from 'typeorm';

export class Doctors1635163035305 implements MigrationInterface {
  name = 'Doctors1635163035305';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "doctors"."doctor" 
        (
          "id" SERIAL NOT NULL, 
          "userId" integer NOT NULL, 
          "createdAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, 
          "specializationId" integer, 
          "queueId" integer, 
          CONSTRAINT "UQ_doctor_user" UNIQUE ("userId"), 
          CONSTRAINT "REL_34c18a574a18ce23ceb564a6eb" UNIQUE ("queueId"), 
          CONSTRAINT "PK_doctor" PRIMARY KEY ("id")
        )
      `,
    );
    await queryRunner.query(
      `ALTER TABLE "doctors"."resolution" 
      ADD CONSTRAINT "FK_resolution_doctor" FOREIGN KEY ("doctorId") 
      REFERENCES "doctors"."doctor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );

    await queryRunner.query(
      `ALTER TABLE "doctors"."doctor" 
      ADD CONSTRAINT "FK_doctor_specialization" FOREIGN KEY ("specializationId") 
      REFERENCES "doctors"."specialization"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "doctors"."doctor" 
      ADD CONSTRAINT "FK_doctor_queue" FOREIGN KEY ("queueId") 
      REFERENCES "queues"."queue"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "doctors"."doctor" DROP CONSTRAINT "FK_doctor_queue"`,
    );
    await queryRunner.query(
      `ALTER TABLE "doctors"."doctor" DROP CONSTRAINT "FK_doctor_specialization"`,
    );

    await queryRunner.query(
      `ALTER TABLE "doctors"."resolution" DROP CONSTRAINT "FK_resolution_doctor"`,
    );

    await queryRunner.query(`DROP TABLE "doctors"."doctor"`);
  }
}
