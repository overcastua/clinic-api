import { ModifiedCreateResolutionDto } from 'src/patient/dto/create-resolution.dto';
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

  async createResolution(dto: ModifiedCreateResolutionDto): Promise<void> {
    const newResolution = new ResolutionsEntity();
    newResolution.patient = dto.patient;
    newResolution.text = dto.text;
    newResolution.expires_on = dto.expires_on;
    await this.save(newResolution);
  }
}
