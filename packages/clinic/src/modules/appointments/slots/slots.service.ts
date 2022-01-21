import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PatientEntity } from 'src/modules/patient/patient.entity';
import { PatientService } from '../../patient/patient.service';
import { CreateAppointmentDto } from '../dto/create-appointment.dto';
import { TimeSlotsEntity } from './slots.entity';
import { TimeSlotsRepository } from './slots.repository';
import { UpdateResult } from 'typeorm';

@Injectable()
export class TimeSlotsService {
  constructor(
    @InjectRepository(TimeSlotsRepository)
    private readonly repository: TimeSlotsRepository,
    private readonly patientService: PatientService,
  ) {}

  async patientGetAllAppointments(userId: number): Promise<TimeSlotsEntity[]> {
    const patient = await this.patientService.findPatientByUserId(userId);

    return this.repository.patientGetAllAppointments(patient.id);
  }

  async doctorGetClosest(doctorId: number): Promise<TimeSlotsEntity> {
    const appointment: TimeSlotsEntity = await this.repository.doctorGetClosest(
      doctorId,
    );
    if (!appointment) throw new NotFoundException('No appointments');

    return appointment;
  }

  async doctorGetAllFuture(doctorId: number): Promise<TimeSlotsEntity[]> {
    const appointments: TimeSlotsEntity[] =
      await this.repository.doctorGetAllFuture(doctorId);

    if (!appointments.length) throw new NotFoundException('No appointments');

    return appointments;
  }

  async doctorFinishCurrentAndGetClosest(
    doctorId: number,
  ): Promise<TimeSlotsEntity> {
    const finishedAppointment = await this.repository.doctorFinishCurrent(
      doctorId,
    );

    if (!finishedAppointment) {
      throw new NotFoundException('There is no current appointment');
    }

    return this.doctorGetClosest(doctorId);
  }

  async getAllForDate(
    doctorId: number,
    date: Date,
  ): Promise<TimeSlotsEntity[]> {
    return this.repository.getAllForDate(doctorId, date);
  }

  async add(
    dto: CreateAppointmentDto,
    userId: number,
    doctorId: number,
  ): Promise<UpdateResult> {
    const patient: PatientEntity =
      await this.patientService.findPatientByUserId(userId);

    const result = await this.repository.setUp(dto, patient, doctorId);

    if (!result) {
      throw new NotFoundException(
        'Appointment slot with the given params does not exist or is already occupied',
      );
    }
    return result;
  }
}
