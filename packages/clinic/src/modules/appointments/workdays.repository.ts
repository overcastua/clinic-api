import { Repository, EntityRepository } from 'typeorm';
import { DoctorEntity } from '../doctors/doctors.entity';
import { WorkdaysEntity } from './workdays.entity';

@EntityRepository(WorkdaysEntity)
export class WorkdaysRepository extends Repository<WorkdaysEntity> {
  async add(doctor: DoctorEntity): Promise<WorkdaysEntity> {
    const newQueue = new WorkdaysEntity();
    newQueue.doctor = doctor;
    return this.save(newQueue);
  }

  async getAllWorkdaysForNext7days(
    doctorId: number,
  ): Promise<WorkdaysEntity[]> {
    return this.createQueryBuilder('d')
      .where('d.doctorId =:doctorId', { doctorId })
      .orderBy('d.date', 'ASC')
      .limit(5)
      .getMany();
  }
  async findById(id: number): Promise<WorkdaysEntity> {
    return this.findOne({ id });
  }
}
