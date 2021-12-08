import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { CustomConfigService } from '../config/params.service';
import { CustomConfigModule } from '../config/params.module';
import { join } from 'path';

export const TypeormAsyncConfiguration = (
  dir: string,
): TypeOrmModuleAsyncOptions => ({
  imports: [CustomConfigModule],
  useFactory: (config: CustomConfigService) => ({
    type: 'postgres',
    host: config.get<string>('database.hostname'),
    port: config.get<number>('database.port'),
    username: config.get<string>('database.user'),
    password: config.get<string>('database.password'),
    database: config.get<string>('database.database'),
    entities: [join(dir, '../modules/**/*.entity.{ts,js}')],
    migrations: [join(dir, '../migrations/*.{ts,js}')],
    cli: {
      migrationsDir: join(dir, '../migrations'),
    },
    migrationsRun: JSON.parse(config.get<string>('database.run_migrations')),
    dropSchema: false,
    synchronize: false,
    logging: true,
  }),
  inject: [CustomConfigService],
});
