import { ForbiddenException, GoneException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateResolutionDto } from './dto/create-resolution.dto';
import { TimeHelper } from '@repos/common';
import { ResolutionsEntity } from './resolutions.entity';
import { ResolutionsRepository } from './resolutions.repository';
import { UpdateResolutionDto } from './dto/update-resolution.dto';
import { DoctorsService } from '../doctors/doctors.service';
import { PatientService } from '../patient/patient.service';

@Injectable()
export class ResolutionsService {
  constructor(
    @InjectRepository(ResolutionsRepository)
    private readonly resolutionsRepository: ResolutionsRepository,
    private readonly doctorsService: DoctorsService,
    private readonly patientsService: PatientService,
  ) {}

  async getAllById(id: number): Promise<ResolutionsEntity[]> {
    const resolutions: ResolutionsEntity[] =
      await this.resolutionsRepository.getAllByPatientId(id);

    return resolutions;
  }

  async patientGetOwn(uId: number): Promise<ResolutionsEntity[]> {
    const patient = await this.patientsService.findPatientByUserId(uId);
    const resolutions: ResolutionsEntity[] =
      await this.resolutionsRepository.getAllByPatientId(patient.id);

    return resolutions;
  }

  async createResolution(
    dto: CreateResolutionDto,
    userId: number,
  ): Promise<void> {
    const doctor = await this.doctorsService.findDoctorByUserId(userId);

    const ttl = new Date(
      TimeHelper.now() + TimeHelper.minToMs(dto.expiresIn),
    ).toISOString() as unknown as Date;

    return this.resolutionsRepository.createResolution(dto, ttl, doctor);
  }

  async updateResolution(
    resId: number,
    dto: UpdateResolutionDto,
    userId: number,
  ): Promise<void> {
    const doctor = await this.doctorsService.findDoctorByUserId(userId);
    const result = await this.resolutionsRepository.updateResolution(
      resId,
      dto,
      doctor.id,
    );

    if (result.affected === 0) {
      throw new GoneException('This resolution was previously deleted');
    }
  }

  async deleteResolution(resId: number, userId: number): Promise<void> {
    const doctor = await this.doctorsService.findDoctorByUserId(userId);

    const res = await this.resolutionsRepository.deleteResolution(
      resId,
      doctor.id,
    );

    if (res.affected === 0) {
      throw new ForbiddenException(
        'You do not have permission to delete this resolution',
      );
    }
  }
}
