import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkdaysRepository } from './workdays.repository';
import { AppointmentsService } from './appointments.service';
import { ProfileModule } from '../profile/profile.module';
import { SlotsModule } from './slots/slots.module';
import { AppointmentsController } from './appointments.controller';
import { DoctorsModule } from '../doctors/doctors.module';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CustomConfigModule, CustomConfigService } from '@repos/common';
import { KAFKA_TOKEN } from './constants';

@Module({
  imports: [
    TypeOrmModule.forFeature([WorkdaysRepository]),
    SlotsModule,
    ProfileModule,
    DoctorsModule,
    ClientsModule.registerAsync([
      {
        name: KAFKA_TOKEN,
        imports: [CustomConfigModule],
        useFactory: async (configService: CustomConfigService) => ({
          transport: Transport.KAFKA,
          options: {
            client: {
              clientId: 'client',
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
  ],
  providers: [AppointmentsService],
  controllers: [AppointmentsController],
  exports: [AppointmentsService],
})
export class AppointmentsModule {}
