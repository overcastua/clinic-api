import { MigrationInterface, QueryRunner } from 'typeorm';

export class AppointmentCreated1635163035306 implements MigrationInterface {
  name = 'AppointmentCreated1635163035306';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "notifications"."appointmentCreated" 
        (
          "id" SERIAL NOT NULL,
          "date" TIMESTAMP NOT NULL,
          "patientId" integer NOT NULL,
          "doctorUserId" integer NOT NULL,
          CONSTRAINT "PK_appointmentCreatedEvent" PRIMARY KEY ("id")
        )
      `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "notifications"."appointmentCreated"`);
  }
}
