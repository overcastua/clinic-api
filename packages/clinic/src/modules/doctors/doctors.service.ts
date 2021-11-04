import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppointmentsService } from '../appointments/appointments.service';
import { CreateAppointmentDto } from '../appointments/dto/create-appointment.dto';
import { TimeSlotsEntity } from '../appointments/slots/slots.entity';
import { SpecializationEntity } from '../specializations/specializations.entity';
import { SpecializationsService } from '../specializations/specializations.service';
import { DoctorEntity } from './doctors.entity';
import { DoctorsRepository } from './doctors.repository';

@Injectable()
export class DoctorsService {
  constructor(
    @InjectRepository(DoctorsRepository)
    private readonly repository: DoctorsRepository,
    private readonly specService: SpecializationsService,
    private readonly appointmentService: AppointmentsService,
  ) {}

  async getAllDoctorsOfCertainSpecialization(
    specId: number,
  ): Promise<DoctorEntity[]> {
    const doctors: DoctorEntity[] =
      await this.repository.getAllBySpecializationId(specId);

    if (!doctors.length) {
      throw new NotFoundException(
        'There is no doctors with this specialization',
      );
    }

    return doctors;
  }

  async getAllAppointments(
    doctorId: number,
    date: Date,
  ): Promise<TimeSlotsEntity[]> {
    return this.appointmentService.getAllForDate(doctorId, date);
  }

  async createAppointment(
    dto: CreateAppointmentDto,
    doctorId: number,
    userId: number,
  ): Promise<void> {
    return this.appointmentService.createAppointment(dto, userId, doctorId);
  }

  async getClosestAppointment(userId: number) {
    const doctor = await this.repository.findDoctorByUserId(userId);
    return this.appointmentService.getClosest(doctor.id);
  }

  async getNext(userId: number) {
    const doctor = await this.repository.findDoctorByUserId(userId);
    return this.appointmentService.getNext(doctor.id);
  }

  async findDoctorByUserId(userId: number): Promise<DoctorEntity> {
    const doctor: DoctorEntity = await this.repository.findDoctorByUserId(
      userId,
    );

    if (!doctor)
      throw new NotFoundException('Doctor with this userId does not exist');

    return doctor;
  }

  async getAllSpecializations(): Promise<SpecializationEntity[]> {
    return this.specService.getAll();
  }
}
