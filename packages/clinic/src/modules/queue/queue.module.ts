import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientModule } from '../patient/patient.module';
import { QueuePositionRepository } from './positions/queuePositions.repository';
import { QueuePositionService } from './positions/queuePositions.service';
import { QueueController } from './queue.controller';
import { QueueRepository } from './queue.repository';
import { QueueService } from './queue.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([QueueRepository, QueuePositionRepository]),
    PatientModule,
  ],
  controllers: [QueueController],
  providers: [QueueService, QueuePositionService],
  exports: [QueueService],
})
export class QueueModule {}
