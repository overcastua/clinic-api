import { PatientEntity } from 'src/modules/patient/patient.entity';
import { Repository, EntityRepository } from 'typeorm';
import { ResolutionsEntity } from './resolutions.entity';

@EntityRepository(ResolutionsEntity)
export class ResolutionsRepository extends Repository<ResolutionsEntity> {
  async getAllByPatientId(id: number): Promise<ResolutionsEntity[]> {
    return this.createQueryBuilder('res')
      .leftJoinAndSelect('res.patient', 'p')
      .where('p.id = :id', { id })
      .andWhere('res.expires_in > :now', { now: new Date() })
      .getMany();
  }

  async createResolution(dto: any, patient: PatientEntity): Promise<void> {
    const newResolution = new ResolutionsEntity();
    newResolution.patient = patient;
    newResolution.text = dto.text;
    newResolution.expires_in = dto.expires_in;

    await this.save(newResolution);
  }
}
