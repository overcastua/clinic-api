import { Injectable } from '@nestjs/common';
import { ResolutionsEntity } from 'src/modules/resolutions/resolutions.entity';
import { ResolutionsService } from 'src/modules/resolutions/resolutions.service';

@Injectable()
export class MeService {
  constructor(private readonly resolutionsService: ResolutionsService) {}
  async getOwnResolutions(patientId: number): Promise<ResolutionsEntity[]> {
    return this.resolutionsService.getAllById(patientId);
  }
}
