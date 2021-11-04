import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { TimeSlotsEntity } from './slots/slots.entity';
import { TimeSlotsService } from './slots/slots.service';
import { WorkdaysRepository } from './workdays.repository';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(WorkdaysRepository)
    private readonly appointmentsRepository: WorkdaysRepository,
    private readonly timeslotsService: TimeSlotsService,
  ) {}

  async getClosest(queueId: number): Promise<TimeSlotsEntity> {
    return this.timeslotsService.getClosest(queueId);
  }

  async createAppointment(
    dto: CreateAppointmentDto,
    userId: number,
    doctorId: number,
  ): Promise<void> {
    return this.timeslotsService.add(dto, userId, doctorId);
  }

  async getNext(doctorId: number): Promise<TimeSlotsEntity> {
    return this.timeslotsService.finishCurrentAndGetClosest(doctorId);
  }

  async getAllForDate(
    doctorId: number,
    date: Date,
  ): Promise<TimeSlotsEntity[]> {
    return this.timeslotsService.getAllForDate(doctorId, date);
  }
}
