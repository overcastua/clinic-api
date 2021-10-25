import { MigrationInterface, QueryRunner } from 'typeorm';

export class Specializations1635163035304 implements MigrationInterface {
  name = 'Specializations1635163035304';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "doctors"."specialization" 
        (
          "id" SERIAL NOT NULL, 
          "title" character varying NOT NULL, 
          CONSTRAINT "PK_specialization" PRIMARY KEY ("id")
        )
      `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "doctors"."specialization"`);
  }
}
