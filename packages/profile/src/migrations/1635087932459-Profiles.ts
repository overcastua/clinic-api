import { MigrationInterface, QueryRunner } from 'typeorm';

export class Profiles1635087932459 implements MigrationInterface {
  name = 'Profiles1635087932459';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "profile"."profile" 
        (
          "id" SERIAL NOT NULL, 
          "name" character varying NOT NULL, 
          "gender" character varying NOT NULL, 
          "birthDate" TIMESTAMP NOT NULL, "userId" integer NOT NULL, 
          CONSTRAINT "UQ_profile_user" UNIQUE ("userId"), 
          CONSTRAINT "PK_profile" PRIMARY KEY ("id")
        )
      `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "profile"."profile"`);
  }
}
