import { PatientEntity } from '../../patient/patient.entity';
import { Repository, EntityRepository, UpdateResult } from 'typeorm';
import { TimeSlotsEntity } from './slots.entity';
import { CreateAppointmentDto } from '../dto/create-appointment.dto';

@EntityRepository(TimeSlotsEntity)
export class TimeSlotsRepository extends Repository<TimeSlotsEntity> {
  async getClosest(doctorId: number): Promise<TimeSlotsEntity> {
    return this.createQueryBuilder('ts')
      .leftJoinAndSelect('ts.workday', 'wd')
      .leftJoinAndSelect('wd.doctor', 'doc')
      .where('doc.id = :id', { id: doctorId })
      .andWhere('ts.finished = false')
      .andWhere('ts.status = false')
      .leftJoinAndSelect('ts.patient', 'p')
      .orderBy('wd.date', 'ASC')
      .addOrderBy('ts.time', 'ASC')
      .getOne();
  }

  async finishCurrent(doctorId: number): Promise<UpdateResult> {
    const id =
      (
        await this.createQueryBuilder('ts')
          .leftJoinAndSelect('ts.workday', 'wd')
          .leftJoinAndSelect('wd.doctor', 'doc')
          .where('doc.id = :id', { id: doctorId })
          .andWhere('ts.finished = false')
          .andWhere('ts.status = false')
          .leftJoinAndSelect('ts.patient', 'p')
          .orderBy('wd.date', 'ASC')
          .addOrderBy('ts.time', 'ASC')
          .getOne()
      )?.id || null;

    if (!id) {
      return null;
    }

    return this.createQueryBuilder()
      .update()
      .set({ finished: true })
      .where('id = :id', { id })
      .execute();
  }

  async setUp(
    dto: CreateAppointmentDto,
    patient: PatientEntity,
    doctorId: number,
  ): Promise<UpdateResult | null> {
    const id =
      (
        await this.createQueryBuilder('ts')
          .leftJoinAndSelect('ts.workday', 'wd')
          .where('wd.doctorId = :id', { id: doctorId })
          .andWhere('wd.date = :date', { date: dto.date })
          .andWhere('ts.time = :time', { time: dto.time })
          .andWhere('ts.finished = false')
          .andWhere('ts.status = true')
          .getOne()
      )?.id || null;
    console.log(id);

    if (!id) {
      return null;
    }

    return this.createQueryBuilder()
      .update()
      .set({ patient, status: false })
      .where('id = :id', { id })
      .execute();
  }
}
