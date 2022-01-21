import { MigrationInterface, QueryRunner } from 'typeorm';

export class Notifications1635163035306 implements MigrationInterface {
  name = 'Notifications1635163035306';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "notifications"."notifications" 
        (
          "id" SERIAL NOT NULL,
          "userId" integer NOT NULL,
          "isSeen" boolean NOT NULL DEFAULT false,
          "type" character varying NOT NULL, 
          "payload" jsonb NOT NULL,
          CONSTRAINT "PK_notification" PRIMARY KEY ("id")
        )
      `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "notifications"."notifications"`);
  }
}
