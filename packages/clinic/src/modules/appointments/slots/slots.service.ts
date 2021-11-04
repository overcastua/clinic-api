import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PatientEntity } from 'src/modules/patient/patient.entity';
import { PatientService } from '../../patient/patient.service';
import { CreateAppointmentDto } from '../dto/create-appointment.dto';
import { TimeSlotsEntity } from './slots.entity';
import { TimeSlotsRepository } from './slots.repository';

@Injectable()
export class TimeSlotsService {
  constructor(
    @InjectRepository(TimeSlotsRepository)
    private readonly repository: TimeSlotsRepository,
    private readonly patientService: PatientService,
  ) {}

  async getClosest(doctorId: number): Promise<TimeSlotsEntity> {
    const entry: TimeSlotsEntity = await this.repository.getClosest(doctorId);
    if (!entry) throw new NotFoundException('No appointments');

    return entry;
  }

  async finishCurrentAndGetClosest(doctorId: number): Promise<TimeSlotsEntity> {
    const finishedAppointment = await this.repository.finishCurrent(doctorId);

    if (!finishedAppointment) {
      throw new NotFoundException('There is no current appointment');
    }

    return this.getClosest(doctorId);
  }

  async add(
    dto: CreateAppointmentDto,
    userId: number,
    doctorId: number,
  ): Promise<void> {
    const patient: PatientEntity =
      await this.patientService.findPatientByUserId(userId);

    const result = await this.repository.setUp(dto, patient, doctorId);

    if (!result) {
      throw new NotFoundException(
        'Appointment slot with the given params does not exist or is already occupied',
      );
    }
  }
}
