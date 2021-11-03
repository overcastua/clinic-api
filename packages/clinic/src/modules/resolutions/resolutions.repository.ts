import { PatientEntity } from '../patient/patient.entity';
import { Repository, EntityRepository } from 'typeorm';
import { ResolutionsEntity } from './resolutions.entity';

@EntityRepository(ResolutionsEntity)
export class ResolutionsRepository extends Repository<ResolutionsEntity> {
  async getAllByPatientId(id: number): Promise<ResolutionsEntity[]> {
    return this.createQueryBuilder('res')
      .leftJoinAndSelect('res.patient', 'p')
      .leftJoinAndSelect('res.doctor', 'd')
      .where('p.id = :id', { id })
      .andWhere('res.expiresIn > :now', { now: new Date() })
      .getMany();
  }

  async createResolution(dto: any, patient: PatientEntity): Promise<void> {
    const newResolution = new ResolutionsEntity();

    newResolution.patient = patient;
    newResolution.text = dto.text;
    newResolution.expiresIn = dto.expiresIn;
    newResolution.doctor = dto.doctor;

    await this.save(newResolution);
  }
}
