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
          CONSTRAINT "UQ_doctor_user" UNIQUE ("userId"), 
          CONSTRAINT "PK_doctor" PRIMARY KEY ("id")
        )
      `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "doctors"."doctor"`);
  }
}
