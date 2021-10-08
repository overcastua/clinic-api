import { CreateResolutionDto } from 'src/patient/dto/create-resolution.dto';
import { PatientEntity } from 'src/patient/patient.entity';
import { Repository, EntityRepository } from 'typeorm';
import { ResolutionsEntity } from './resolutions.entity';

@EntityRepository(ResolutionsEntity)
export class ResolutionsRepository extends Repository<ResolutionsEntity> {
  async getAllByName(name: string): Promise<ResolutionsEntity[]> {
    return this.createQueryBuilder('res')
      .leftJoinAndSelect('res.patient', 'p')
      .where('p.name = :name', { name })
      .getMany();
  }

  async createResolution(
    dto: CreateResolutionDto,
    patient: PatientEntity,
  ): Promise<void> {
    const newResolution = new ResolutionsEntity();
    newResolution.patient = patient;
    newResolution.text = dto.text;
    newResolution.expires_in = String(dto.expires_in);

    await this.save(newResolution);
  }
}
