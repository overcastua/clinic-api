import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserData1634043616032 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    let query =
      'CREATE TABLE `user` (' +
      '`id` int NOT NULL AUTO_INCREMENT, ' +
      '`email` varchar(255) NOT NULL, ' +
      '`password` varchar(255) NOT NULL, ' +
      '`created_at` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), ' +
      'PRIMARY KEY (`id`), ' +
      'UNIQUE KEY `IDX_e12875dfb3b1d92d7d7c5377e2` (`email`) ' +
      ') ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;';
    queryRunner.query(query);
    query =
      'INSERT INTO `user` (`id`, `email`, `password`, `created_at`) VALUES ' +
      "(1, 'test@gmail.com', '$2b$10$wNV9I/9FhUu6qLPXEMhIwOvUlCKUxLC0g5rzeMoC.r8klWEBrJ5IO', '2021-10-09 14:55:56.874564');";

    queryRunner.query(query);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    return;
  }
}
