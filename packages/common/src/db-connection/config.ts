import { join } from 'path';
import { ConnectionOptions } from 'typeorm';

export const connectionOptions = (dir, env): ConnectionOptions => ({
  type: 'postgres',
  host: env.DB_HOSTNAME,
  port: parseInt(env.DB_PORT, 10),
  username: env.POSTGRES_USER,
  password: env.POSTGRES_PASSWORD,
  database: env.POSTGRES_DB,
  entities: [join(dir, '../**/*.entity.{ts,js}')],
  migrations: [join(dir, '../migrations/*.{ts,js}')],
  cli: {
    migrationsDir: join(dir, '../migrations'),
  },
  migrationsRun: JSON.parse(env.RUN_MIGRATIONS),
  dropSchema: false,
  synchronize: false,
  logging: true,
});
