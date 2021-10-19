import { MigrationInterface, QueryRunner } from 'typeorm';

export class Initial1634159178101 implements MigrationInterface {
  name = 'Initial1634159178101';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`resolution\` (\`id\` int NOT NULL AUTO_INCREMENT, \`text\` varchar(255) NOT NULL, \`expiresIn\` datetime NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`patientId\` int NULL, \`doctorId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`patient\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`gender\` varchar(255) NOT NULL, \`birthDate\` datetime NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`userId\` int NULL, UNIQUE INDEX \`REL_6636aefca0bdad8933c7cc3e39\` (\`userId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`position\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`patientId\` int NULL, \`queueId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`queue\` (\`id\` int NOT NULL AUTO_INCREMENT, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`specialization\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`doctor\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`gender\` varchar(255) NOT NULL, \`birthDate\` datetime NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`userId\` int NULL, \`specializationId\` int NULL, \`queueId\` int NULL, UNIQUE INDEX \`REL_e573a17ab8b6eea2b7fe9905fa\` (\`userId\`), UNIQUE INDEX \`REL_34c18a574a18ce23ceb564a6eb\` (\`queueId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`resolution\` ADD CONSTRAINT \`FK_2f6d685a47cea653fe441a1a1ee\` FOREIGN KEY (\`patientId\`) REFERENCES \`patient\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`resolution\` ADD CONSTRAINT \`FK_0cd91a2e4a9c20f1675503dccfe\` FOREIGN KEY (\`doctorId\`) REFERENCES \`doctor\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`patient\` ADD CONSTRAINT \`FK_6636aefca0bdad8933c7cc3e394\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`position\` ADD CONSTRAINT \`FK_ecf04e9fcc3ec6635d82168506a\` FOREIGN KEY (\`patientId\`) REFERENCES \`patient\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`position\` ADD CONSTRAINT \`FK_a4cfe1c2f380d0f16a8f0755f90\` FOREIGN KEY (\`queueId\`) REFERENCES \`queue\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`doctor\` ADD CONSTRAINT \`FK_e573a17ab8b6eea2b7fe9905fa8\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`doctor\` ADD CONSTRAINT \`FK_65a435da4ad7c43d3e310c89dfc\` FOREIGN KEY (\`specializationId\`) REFERENCES \`specialization\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`doctor\` ADD CONSTRAINT \`FK_34c18a574a18ce23ceb564a6eb7\` FOREIGN KEY (\`queueId\`) REFERENCES \`queue\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`doctor\` DROP FOREIGN KEY \`FK_34c18a574a18ce23ceb564a6eb7\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`doctor\` DROP FOREIGN KEY \`FK_65a435da4ad7c43d3e310c89dfc\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`doctor\` DROP FOREIGN KEY \`FK_e573a17ab8b6eea2b7fe9905fa8\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`position\` DROP FOREIGN KEY \`FK_a4cfe1c2f380d0f16a8f0755f90\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`position\` DROP FOREIGN KEY \`FK_ecf04e9fcc3ec6635d82168506a\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`patient\` DROP FOREIGN KEY \`FK_6636aefca0bdad8933c7cc3e394\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`resolution\` DROP FOREIGN KEY \`FK_0cd91a2e4a9c20f1675503dccfe\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`resolution\` DROP FOREIGN KEY \`FK_2f6d685a47cea653fe441a1a1ee\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_34c18a574a18ce23ceb564a6eb\` ON \`doctor\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_e573a17ab8b6eea2b7fe9905fa\` ON \`doctor\``,
    );
    await queryRunner.query(`DROP TABLE \`doctor\``);
    await queryRunner.query(`DROP TABLE \`specialization\``);
    await queryRunner.query(`DROP TABLE \`queue\``);
    await queryRunner.query(`DROP TABLE \`position\``);
    await queryRunner.query(
      `DROP INDEX \`REL_6636aefca0bdad8933c7cc3e39\` ON \`patient\``,
    );
    await queryRunner.query(`DROP TABLE \`patient\``);
    await queryRunner.query(`DROP TABLE \`resolution\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``,
    );
    await queryRunner.query(`DROP TABLE \`user\``);
  }
}
