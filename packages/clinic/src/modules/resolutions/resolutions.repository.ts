import { Repository, EntityRepository } from 'typeorm';
import { UpdateResolutionDto } from '../patient/dto/update-resolution.dto';
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

  async createResolution(dto: any): Promise<void> {
    const newResolution = new ResolutionsEntity();

    newResolution.patientId = dto.patientId;
    newResolution.text = dto.text;
    newResolution.expiresIn = dto.expiresIn;
    newResolution.doctor = dto.doctor;

    await this.save(newResolution);
  }

  async updateResolution(dto: UpdateResolutionDto): Promise<void> {
    await this.createQueryBuilder()
      .update()
      .set({ text: dto.text })
      .where('id = :id', { id: dto.resolutionId })
      .execute();
  }
}
