import { PatientEntity } from '../../patient/patient.entity';
import { Repository, EntityRepository, UpdateResult } from 'typeorm';
import { TimeSlotsEntity } from './slots.entity';
import { CreateAppointmentDto } from '../dto/create-appointment.dto';

@EntityRepository(TimeSlotsEntity)
export class TimeSlotsRepository extends Repository<TimeSlotsEntity> {
  async patientGetAllAppointments(
    patientId: number,
  ): Promise<TimeSlotsEntity[]> {
    return await this.createQueryBuilder('ts')
      .innerJoinAndSelect('ts.workday', 'wd')
      .innerJoinAndSelect('wd.doctor', 'doc')
      .where('ts.patientId = :id', {
        id: patientId,
      })
      .andWhere('ts.isFinished = false')
      .getMany();
  }

  async doctorGetClosest(doctorId: number): Promise<TimeSlotsEntity> {
    return this.createQueryBuilder('ts')
      .innerJoinAndSelect('ts.workday', 'wd')
      .innerJoinAndSelect('wd.doctor', 'doc')
      .where('doc.id = :id', { id: doctorId })
      .andWhere('ts.isFinished = false')
      .andWhere('ts.isFree = false')
      .innerJoinAndSelect('ts.patient', 'p')
      .orderBy('wd.date', 'ASC')
      .addOrderBy('ts.time', 'ASC')
      .getOne();
  }

  async doctorGetAllFuture(doctorId: number): Promise<TimeSlotsEntity[]> {
    return this.createQueryBuilder('ts')
      .innerJoinAndSelect('ts.workday', 'wd')
      .innerJoinAndSelect('wd.doctor', 'doc')
      .where('doc.id = :id', { id: doctorId })
      .andWhere('ts.isFinished = false')
      .andWhere('ts.isFree = false')
      .innerJoinAndSelect('ts.patient', 'p')
      .orderBy('wd.date', 'ASC')
      .addOrderBy('ts.time', 'ASC')
      .getMany();
  }

  async doctorFinishCurrent(doctorId: number): Promise<UpdateResult> {
    const id =
      (
        await this.createQueryBuilder('ts')
          .innerJoinAndSelect('ts.workday', 'wd')
          .innerJoinAndSelect('wd.doctor', 'doc')
          .where('doc.id = :id', { id: doctorId })
          .andWhere('ts.isFinished = false')
          .andWhere('ts.isFree = false')
          .innerJoinAndSelect('ts.patient', 'p')
          .orderBy('wd.date', 'ASC')
          .addOrderBy('ts.time', 'ASC')
          .getOne()
      )?.id || null;

    if (!id) {
      return null;
    }

    return this.createQueryBuilder()
      .update()
      .set({ isFinished: true })
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
          .innerJoinAndSelect('ts.workday', 'wd')
          .where('wd.doctorId = :id', { id: doctorId })
          .andWhere('wd.date = :date', { date: dto.date })
          .andWhere('ts.time = :time', { time: dto.time })
          .andWhere('ts.isFinished = false')
          .andWhere('ts.isFree = true')
          .getOne()
      )?.id || null;

    if (!id) {
      return null;
    }

    return this.createQueryBuilder()
      .update()
      .set({ patient, isFree: false })
      .where('id = :id', { id })
      .execute();
  }

  async getAllForDate(
    doctorId: number,
    date: Date,
  ): Promise<TimeSlotsEntity[]> {
    return this.createQueryBuilder('ts')
      .innerJoinAndSelect('ts.workday', 'wd')
      .where('wd.doctorId = :id', { id: doctorId })
      .andWhere('wd.date = :date', { date: date })
      .orderBy('ts.time', 'ASC')
      .getMany();
  }
}
