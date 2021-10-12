import { MigrationInterface, QueryRunner } from 'typeorm';

export class QueueData1634052796488 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const query =
      'CREATE TABLE `queue` (' +
      '`id` int NOT NULL AUTO_INCREMENT, ' +
      '`created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), ' +
      '`patientId` int DEFAULT NULL, ' +
      'PRIMARY KEY (`id`), ' +
      'KEY `FK_56502779951116484924e1f3f99` (`patientId`), ' +
      'CONSTRAINT `FK_56502779951116484924e1f3f99` FOREIGN KEY (`patientId`) REFERENCES `patient` (`id`)' +
      ') ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;';
    queryRunner.query(query);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    return;
  }
}
