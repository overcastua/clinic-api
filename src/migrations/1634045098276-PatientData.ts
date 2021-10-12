import { MigrationInterface, QueryRunner } from 'typeorm';

export class PatientData1634045098276 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    let query =
      'CREATE TABLE `patient` ( ' +
      '`id` int NOT NULL AUTO_INCREMENT, ' +
      '`name` varchar(255) NOT NULL, ' +
      '`gender` varchar(255) NOT NULL, ' +
      '`birthDate` datetime NOT NULL, ' +
      '`created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), ' +
      '`userId` int DEFAULT NULL, ' +
      'PRIMARY KEY (`id`), ' +
      'UNIQUE KEY `REL_6636aefca0bdad8933c7cc3e39` (`userId`), ' +
      'CONSTRAINT `FK_6636aefca0bdad8933c7cc3e394` FOREIGN KEY (`userId`) REFERENCES `user` (`id`)' +
      ') ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;';
    queryRunner.query(query);
    query =
      'INSERT INTO `patient` (`id`, `name`, `gender`, `birthDate`, `created_at`, `userId`) VALUES ' +
      "(1, 'Dima', 'male', '1995-12-17 00:00:00', '2021-10-09 14:55:56.894749', 1);";
    queryRunner.query(query);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    return;
  }
}
