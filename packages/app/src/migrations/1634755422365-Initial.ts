import { MigrationInterface, QueryRunner } from 'typeorm';

export class Initial1634755422365 implements MigrationInterface {
  name = 'Initial1634755422365';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "profile"."user" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "doctors"."resolution" ("id" SERIAL NOT NULL, "text" character varying NOT NULL, "expiresIn" TIMESTAMP NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "patientId" integer, "doctorId" integer, CONSTRAINT "PK_2a6383d82766ccd2a9e6163306d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "queues"."queue" ("id" SERIAL NOT NULL, CONSTRAINT "PK_4adefbd9c73b3f9a49985a5529f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "queues"."position" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "patientId" integer, "queueId" integer, CONSTRAINT "PK_b7f483581562b4dc62ae1a5b7e2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "patients"."patient" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "userId" integer, "profileId" integer, CONSTRAINT "REL_6636aefca0bdad8933c7cc3e39" UNIQUE ("userId"), CONSTRAINT "REL_b2dbd1fb604aaf0134413ce800" UNIQUE ("profileId"), CONSTRAINT "PK_8dfa510bb29ad31ab2139fbfb99" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "profile"."profile" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "gender" character varying NOT NULL, "birthDate" TIMESTAMP NOT NULL, CONSTRAINT "PK_3dd8bfc97e4a77c70971591bdcb" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "doctors"."specialization" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, CONSTRAINT "PK_904dfcbdb57f56f5b57b9c09cc5" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "doctors"."doctor" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "userId" integer, "profileId" integer, "specializationId" integer, "queueId" integer, CONSTRAINT "REL_e573a17ab8b6eea2b7fe9905fa" UNIQUE ("userId"), CONSTRAINT "REL_aef4a4778507331a3275d3025a" UNIQUE ("profileId"), CONSTRAINT "REL_34c18a574a18ce23ceb564a6eb" UNIQUE ("queueId"), CONSTRAINT "PK_ee6bf6c8de78803212c548fcb94" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "doctors"."resolution" ADD CONSTRAINT "FK_2f6d685a47cea653fe441a1a1ee" FOREIGN KEY ("patientId") REFERENCES "patients"."patient"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "doctors"."resolution" ADD CONSTRAINT "FK_0cd91a2e4a9c20f1675503dccfe" FOREIGN KEY ("doctorId") REFERENCES "doctors"."doctor"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "queues"."position" ADD CONSTRAINT "FK_ecf04e9fcc3ec6635d82168506a" FOREIGN KEY ("patientId") REFERENCES "patients"."patient"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "queues"."position" ADD CONSTRAINT "FK_a4cfe1c2f380d0f16a8f0755f90" FOREIGN KEY ("queueId") REFERENCES "queues"."queue"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "patients"."patient" ADD CONSTRAINT "FK_6636aefca0bdad8933c7cc3e394" FOREIGN KEY ("userId") REFERENCES "profile"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "patients"."patient" ADD CONSTRAINT "FK_b2dbd1fb604aaf0134413ce800e" FOREIGN KEY ("profileId") REFERENCES "profile"."profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "doctors"."doctor" ADD CONSTRAINT "FK_e573a17ab8b6eea2b7fe9905fa8" FOREIGN KEY ("userId") REFERENCES "profile"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "doctors"."doctor" ADD CONSTRAINT "FK_aef4a4778507331a3275d3025a2" FOREIGN KEY ("profileId") REFERENCES "profile"."profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "doctors"."doctor" ADD CONSTRAINT "FK_65a435da4ad7c43d3e310c89dfc" FOREIGN KEY ("specializationId") REFERENCES "doctors"."specialization"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "doctors"."doctor" ADD CONSTRAINT "FK_34c18a574a18ce23ceb564a6eb7" FOREIGN KEY ("queueId") REFERENCES "queues"."queue"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "doctors"."doctor" DROP CONSTRAINT "FK_34c18a574a18ce23ceb564a6eb7"`,
    );
    await queryRunner.query(
      `ALTER TABLE "doctors"."doctor" DROP CONSTRAINT "FK_65a435da4ad7c43d3e310c89dfc"`,
    );
    await queryRunner.query(
      `ALTER TABLE "doctors"."doctor" DROP CONSTRAINT "FK_aef4a4778507331a3275d3025a2"`,
    );
    await queryRunner.query(
      `ALTER TABLE "doctors"."doctor" DROP CONSTRAINT "FK_e573a17ab8b6eea2b7fe9905fa8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "patients"."patient" DROP CONSTRAINT "FK_b2dbd1fb604aaf0134413ce800e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "patients"."patient" DROP CONSTRAINT "FK_6636aefca0bdad8933c7cc3e394"`,
    );
    await queryRunner.query(
      `ALTER TABLE "queues"."position" DROP CONSTRAINT "FK_a4cfe1c2f380d0f16a8f0755f90"`,
    );
    await queryRunner.query(
      `ALTER TABLE "queues"."position" DROP CONSTRAINT "FK_ecf04e9fcc3ec6635d82168506a"`,
    );
    await queryRunner.query(
      `ALTER TABLE "doctors"."resolution" DROP CONSTRAINT "FK_0cd91a2e4a9c20f1675503dccfe"`,
    );
    await queryRunner.query(
      `ALTER TABLE "doctors"."resolution" DROP CONSTRAINT "FK_2f6d685a47cea653fe441a1a1ee"`,
    );
    await queryRunner.query(`DROP TABLE "doctors"."doctor"`);
    await queryRunner.query(`DROP TABLE "doctors"."specialization"`);
    await queryRunner.query(`DROP TABLE "profile"."profile"`);
    await queryRunner.query(`DROP TABLE "patients"."patient"`);
    await queryRunner.query(`DROP TABLE "queues"."position"`);
    await queryRunner.query(`DROP TABLE "queues"."queue"`);
    await queryRunner.query(`DROP TABLE "doctors"."resolution"`);
    await queryRunner.query(`DROP TABLE "profile"."user"`);
  }
}
