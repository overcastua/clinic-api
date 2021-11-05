import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DoctorsService } from '../doctors/doctors.service';
import { ProfileService } from '../profile/profile.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { TimeSlotsEntity } from './slots/slots.entity';
import { TimeSlotsService } from './slots/slots.service';
import { WorkdaysEntity } from './workdays.entity';
import { WorkdaysRepository } from './workdays.repository';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(WorkdaysRepository)
    private readonly repository: WorkdaysRepository,
    private readonly timeslotsService: TimeSlotsService,
    private readonly profileService: ProfileService,
    private readonly doctorsService: DoctorsService,
  ) {}

  async patientGetAllAppointments(userId: number): Promise<TimeSlotsEntity[]> {
    return this.timeslotsService.patientGetAllAppointments(userId);
  }

  async doctorGetClosest(userId: number): Promise<TimeSlotsEntity> {
    const { id: doctorId } = await this.doctorsService.findDoctorByUserId(
      userId,
    );

    const closest = await this.timeslotsService.doctorGetClosest(doctorId);
    const patientUserId = closest?.patient.userId;
    if (patientUserId) {
      const profile = await this.profileService.getProfile(patientUserId);
      (closest.patient as any).profile = profile;
    }

    return closest;
  }

  async doctorGetAllFutureAppointments(
    userId: number,
  ): Promise<TimeSlotsEntity[]> {
    const { id: doctorId } = await this.doctorsService.findDoctorByUserId(
      userId,
    );

    const all = await this.timeslotsService.doctorGetAllFuture(doctorId);

    const userIds = all.map((app: TimeSlotsEntity): number => {
      return app.patient.userId;
    });

    const profiles = await this.profileService.getManyProfiles(userIds);

    const response = all.map((app: TimeSlotsEntity): any => {
      const id = app.patient.userId;
      const profile = profiles.find((p) => {
        return p.userId === id;
      });

      (app.patient as any).profile = profile;
      return app;
    });

    return response;
  }

  async createAppointment(
    dto: CreateAppointmentDto,
    userId: number,
    doctorId: number,
  ): Promise<void> {
    return this.timeslotsService.add(dto, userId, doctorId);
  }

  async doctorGetNext(userId: number): Promise<TimeSlotsEntity> {
    const { id: doctorId } = await this.doctorsService.findDoctorByUserId(
      userId,
    );

    return this.timeslotsService.doctorFinishCurrentAndGetClosest(doctorId);
  }

  async getAllForDate(
    doctorId: number,
    date: Date,
  ): Promise<TimeSlotsEntity[]> {
    return this.timeslotsService.getAllForDate(doctorId, date);
  }

  async getAllWorkdaysNext7days(doctorId: number): Promise<WorkdaysEntity[]> {
    return this.repository.getAllWorkdaysForNext7days(doctorId);
  }
}
