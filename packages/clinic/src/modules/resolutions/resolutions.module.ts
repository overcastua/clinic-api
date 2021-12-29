import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorsModule } from '../doctors/doctors.module';
import { PatientModule } from '../patient/patient.module';
import { ResolutionsController } from './resolutions.controller';
import { ResolutionsRepository } from './resolutions.repository';
import { ResolutionsService } from './resolutions.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { KAFKA_TOKEN } from '../constants';
import { CustomConfigModule, CustomConfigService } from '@repos/common';
import { ProfileModule } from '../profile/profile.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ResolutionsRepository]),
    ClientsModule.registerAsync([
      {
        name: KAFKA_TOKEN,
        imports: [CustomConfigModule],
        useFactory: async (configService: CustomConfigService) => ({
          transport: Transport.KAFKA,
          options: {
            client: {
              clientId: 'client1',
              brokers: [configService.get<string>('broker.uri')],
            },
            consumer: {
              groupId: 'client-consumer',
            },
          },
        }),
        inject: [CustomConfigService],
      },
    ]),
    PatientModule,
    DoctorsModule,
    ProfileModule,
  ],
  providers: [ResolutionsService],
  controllers: [ResolutionsController],
})
export class ResolutionsModule {}
