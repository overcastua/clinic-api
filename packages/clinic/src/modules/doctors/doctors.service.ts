import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppointmentsService } from '../appointments/appointments.service';
import { CreateAppointmentDto } from '../appointments/dto/create-appointment.dto';
import { TimeSlotsEntity } from '../appointments/slots/slots.entity';
import { WorkdaysEntity } from '../appointments/workdays.entity';
import { CreateResolutionDto } from '../patient/dto/create-resolution.dto';
import { UpdateResolutionDto } from '../patient/dto/update-resolution.dto';
import { ResolutionsService } from '../resolutions/resolutions.service';
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
    private readonly resolutionsService: ResolutionsService,
  ) {}

  async getAllWorkdaysNext7days(doctorId: number): Promise<WorkdaysEntity[]> {
    return this.appointmentService.getAllWorkdaysNext7days(doctorId);
  }

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

  async getAllFutureAppointments(userId: number): Promise<TimeSlotsEntity[]> {
    const doctor = await this.repository.findDoctorByUserId(userId);
    return this.appointmentService.doctorGetAllFutureAppointmentsByDoctorId(
      doctor.id,
    );
  }

  async getAllTimeSlots(
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
    return this.appointmentService.doctorGetClosest(doctor.id);
  }

  async getNext(userId: number) {
    const doctor = await this.repository.findDoctorByUserId(userId);
    return this.appointmentService.doctorGetNext(doctor.id);
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

  async createResolution(dto: CreateResolutionDto, id: number): Promise<void> {
    const doctor: DoctorEntity = await this.findDoctorByUserId(id);

    await this.resolutionsService.createResolution(dto, doctor);
  }

  async updateResolution(dto: UpdateResolutionDto): Promise<void> {
    await this.resolutionsService.updateResolution(dto);
  }
}
