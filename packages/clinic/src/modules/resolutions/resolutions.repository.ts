import {
  Repository,
  EntityRepository,
  UpdateResult,
  DeleteResult,
} from 'typeorm';
import { DoctorEntity } from '../doctors/doctors.entity';
import { CreateResolutionDto } from './dto/create-resolution.dto';
import { UpdateResolutionDto } from './dto/update-resolution.dto';
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

  async createResolution(
    dto: CreateResolutionDto,
    ttl: Date,
    doctor: DoctorEntity,
  ): Promise<void> {
    const resolution = new ResolutionsEntity(dto, ttl, doctor);

    await this.save(resolution);
  }

  async updateResolution(
    dto: UpdateResolutionDto,
    doctorId: number,
  ): Promise<UpdateResult> {
    return this.createQueryBuilder()
      .update()
      .set({ text: dto.text })
      .where('id = :id', { id: dto.resolutionId })
      .andWhere('doctorId = :doc', { doc: doctorId })
      .execute();
  }
  async deleteResolution(resId: number, docId: number): Promise<DeleteResult> {
    return this.createQueryBuilder()
      .delete()
      .where('id = :id', { id: resId })
      .andWhere('doctorId = :doc', { doc: docId })
      .execute();
  }
}
