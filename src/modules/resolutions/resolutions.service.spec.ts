import { Test } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { ResolutionsService } from './resolutions.service';
import { ResolutionsRepository } from './resolutions.repository';
import { ResolutionsEntity } from './resolutions.entity';
import { CreateResolutionDto } from 'src/modules/patient/dto/create-resolution.dto';
import { PatientEntity } from 'src/modules/patient/patient.entity';

const reposMock = () => ({
  createResolution: jest.fn(),
  getAllByPatientId: jest.fn(),
});

describe('ResolutionsService', () => {
  let service: ResolutionsService;
  let resolutionsRepository: any;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        ResolutionsService,
        {
          provide: ResolutionsRepository,
          useFactory: reposMock,
        },
      ],
    }).compile();

    service = module.get(ResolutionsService);
    resolutionsRepository = module.get(ResolutionsRepository);
  });

  describe('testing getAllById()', () => {
    it('should return all the resolutions for the given patient', async () => {
      expect.assertions(1);
      const arr = [new ResolutionsEntity()];

      resolutionsRepository.getAllByPatientId.mockResolvedValue(arr);

      const res = await service.getAllById(1);

      expect(res).toBe(arr);
    });

    it('should throw a 404 error if no resolutions found', async () => {
      expect.assertions(1);
      const arr = [];

      resolutionsRepository.getAllByPatientId.mockResolvedValue(arr);

      expect(service.getAllById(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('testing createResolution()', () => {
    it('should call the underlying repository', async () => {
      const createMethod = jest.spyOn(
        resolutionsRepository,
        'createResolution',
      );

      const dto: CreateResolutionDto = new CreateResolutionDto();
      dto.expiresIn = 1;

      await service.createResolution(dto, new PatientEntity());

      expect(createMethod).toHaveBeenCalledTimes(1);
    });
  });
});
