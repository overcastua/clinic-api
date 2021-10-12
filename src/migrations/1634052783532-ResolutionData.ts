import { MigrationInterface, QueryRunner } from 'typeorm';

export class ResolutionData1634052783532 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const query =
      'CREATE TABLE `resolution` (' +
      '`id` int NOT NULL AUTO_INCREMENT, ' +
      '`text` varchar(255) NOT NULL, ' +
      '`created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), ' +
      '`patientId` int DEFAULT NULL, ' +
      '`expires_in` datetime NOT NULL, ' +
      'PRIMARY KEY (`id`), ' +
      'KEY `FK_2f6d685a47cea653fe441a1a1ee` (`patientId`), ' +
      'CONSTRAINT `FK_2f6d685a47cea653fe441a1a1ee` FOREIGN KEY (`patientId`) REFERENCES `patient` (`id`)' +
      ') ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;';
    queryRunner.query(query);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    return;
  }
}
