import { MigrationInterface, QueryRunner } from 'typeorm';

export class Initial1634134337160 implements MigrationInterface {
  name = 'Initial1634134337160';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`queue\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`patientId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`resolution\` (\`id\` int NOT NULL AUTO_INCREMENT, \`text\` varchar(255) NOT NULL, \`expires_in\` datetime NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`patientId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`patient\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`gender\` varchar(255) NOT NULL, \`birthDate\` datetime NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`userId\` int NULL, UNIQUE INDEX \`REL_6636aefca0bdad8933c7cc3e39\` (\`userId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`queue\` ADD CONSTRAINT \`FK_56502779951116484924e1f3f99\` FOREIGN KEY (\`patientId\`) REFERENCES \`patient\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`resolution\` ADD CONSTRAINT \`FK_2f6d685a47cea653fe441a1a1ee\` FOREIGN KEY (\`patientId\`) REFERENCES \`patient\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`patient\` ADD CONSTRAINT \`FK_6636aefca0bdad8933c7cc3e394\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`patient\` DROP FOREIGN KEY \`FK_6636aefca0bdad8933c7cc3e394\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`resolution\` DROP FOREIGN KEY \`FK_2f6d685a47cea653fe441a1a1ee\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`queue\` DROP FOREIGN KEY \`FK_56502779951116484924e1f3f99\``,
    );
    await queryRunner.query(
      `DROP INDEX \`REL_6636aefca0bdad8933c7cc3e39\` ON \`patient\``,
    );
    await queryRunner.query(`DROP TABLE \`patient\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``,
    );
    await queryRunner.query(`DROP TABLE \`user\``);
    await queryRunner.query(`DROP TABLE \`resolution\``);
    await queryRunner.query(`DROP TABLE \`queue\``);
  }
}
