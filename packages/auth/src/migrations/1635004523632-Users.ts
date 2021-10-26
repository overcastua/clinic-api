import { MigrationInterface, QueryRunner } from 'typeorm';

export class Users1635004523632 implements MigrationInterface {
  name = 'Users1635004523632';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "identity"."user" 
        (
          "id" SERIAL NOT NULL, 
          "email" character varying NOT NULL, 
          "password" character varying NOT NULL, 
          "createdAt" TIMESTAMP NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, 
          CONSTRAINT "UQ_user_email" UNIQUE ("email"), 
          CONSTRAINT "PK_user" PRIMARY KEY ("id")
        )
      `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "identity"."user"`);
  }
}
