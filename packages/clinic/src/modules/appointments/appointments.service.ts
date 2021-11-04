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
    private readonly positionService: TimeSlotsService,
  ) {}

  async getClosest(queueId: number): Promise<TimeSlotsEntity> {
    return this.positionService.getClosest(queueId);
  }

  async createAppointment(
    dto: CreateAppointmentDto,
    userId: number,
    doctorId: number,
  ): Promise<void> {
    return this.positionService.add(dto, userId, doctorId);
  }

  async getNext(doctorId: number): Promise<TimeSlotsEntity> {
    return this.positionService.finishCurrentAndGetClosest(doctorId);
  }

  // async deleteCurrentAndGetNewFirst(queueId: number): Promise<number> {
  //   return this.positionService.deleteCurrentAndGetNewFirst(queueId);
  // }

  // async add(queueId: number, userId: number): Promise<void> {
  //   const patient = await this.patientService.findPatientByUserId(userId);
  //   const queue = await this.appointmentsRepository.findById(queueId);

  //   if (!queue) {
  //     throw new NotFoundException('Queue with the given id does not exist');
  //   }

  //   await this.positionService.add(queue, patient.id);
  // }

  // async create(doctor: DoctorEntity): Promise<WorkdaysEntity> {
  //   return this.appointmentsRepository.add(doctor);
  // }
}
