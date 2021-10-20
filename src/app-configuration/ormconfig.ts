import { join } from 'path';
import { ConnectionOptions } from 'typeorm';

const connectionOptions: ConnectionOptions = {
  type: 'postgres',
  host: process.env.DB_HOSTNAME,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [join(__dirname, '../**/*.entity.{ts,js}')],
  migrations: [join(__dirname, '../migrations/*.{ts,js}')],
  cli: {
    migrationsDir: join(__dirname, '../migrations'),
  },
  migrationsRun: !!process.env.RUN_MIGRATIONS,
  dropSchema: false,
  synchronize: false,
  logging: true,
};

export = connectionOptions;
