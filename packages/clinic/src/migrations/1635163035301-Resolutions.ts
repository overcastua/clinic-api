import { MigrationInterface, QueryRunner } from 'typeorm';

export class Resolutions1635163035301 implements MigrationInterface {
  name = 'Resolutions1635163035301';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "doctors"."resolution" 
        (
          "id" SERIAL NOT NULL,
          "text" character varying NOT NULL, 
          "expiresIn" TIMESTAMP NOT NULL, 
          "createdAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, 
          "patientId" integer,
          "doctorId" integer,
          CONSTRAINT "PK_resolution" PRIMARY KEY ("id")
        )
      `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "doctors"."resolution"`);
  }
}
