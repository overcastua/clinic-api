import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ModifiedCreateResolutionDto } from 'src/patient/dto/create-resolution.dto';
import { ResolutionsEntity } from './resolutions.entity';
import { ResolutionsRepository } from './resolutions.repository';

@Injectable()
export class ResolutionsService {
  constructor(
    @InjectRepository(ResolutionsRepository)
    private readonly resolutionsRepository: ResolutionsRepository,
  ) {}

  async getAllByName(name: string): Promise<ResolutionsEntity[]> {
    return this.resolutionsRepository.getAllByName(name);
  }

  async createResolution(dto: ModifiedCreateResolutionDto): Promise<void> {
    return this.resolutionsRepository.createResolution(dto);
  }
}
