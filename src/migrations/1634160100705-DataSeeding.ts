import { MigrationInterface, QueryRunner } from 'typeorm';

export class DataSeeding1634159178105 implements MigrationInterface {
  name = 'DataSeeding1634159178105';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO \`specialization\` (\`id\`, \`title\`) VALUES (1, 'Psychiatrist');`,
    );
    await queryRunner.query(
      `INSERT INTO \`specialization\` (\`id\`, \`title\`) VALUES (2, 'Surgeon');`,
    );
    await queryRunner.query(
      `INSERT INTO \`specialization\` (\`id\`, \`title\`) VALUES (3, 'Endocrinologist');`,
    );
    await queryRunner.query(
      `INSERT INTO \`specialization\` (\`id\`, \`title\`) VALUES (4, 'Cardiologist');`,
    );
    await queryRunner.query(
      "INSERT INTO `user` (`id`, `email`, `password`, `created_at`) VALUES (1, 'test@gmail.com', '$2b$10$wNV9I/9FhUu6qLPXEMhIwOvUlCKUxLC0g5rzeMoC.r8klWEBrJ5IO', '2021-10-09 14:55:56.874564');",
    );
    await queryRunner.query(`INSERT INTO \`queue\` (\`id\`) VALUES (1);`);
    await queryRunner.query(
      `INSERT INTO \`doctor\` (\`id\`, \`name\`, \`gender\`, \`birthDate\`, \`userId\`, \`specializationId\`, \`queueId\`, \`created_at\`) VALUES (1, 'QWERTY', 'male', '1995-12-17 00:00:00', 1, 3, 1, '1995-12-17 00:00:00');`,
    );
  }
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM \`specialization\`;`);
    await queryRunner.query(`DELETE FROM \`queue\`;`);
    await queryRunner.query(`DELETE FROM \`doctor\`;`);
  }
}
