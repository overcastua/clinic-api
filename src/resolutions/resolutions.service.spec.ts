import { Test } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { ResolutionsService } from './resolutions.service';
import { ResolutionsRepository } from './resolutions.repository';
import { ResolutionsEntity } from './resolutions.entity';
import { TimeHelper } from 'src/utils/timeHelper';
import { CreateResolutionDto } from 'src/patient/dto/create-resolution.dto';
import { PatientEntity } from 'src/patient/patient.entity';

const reposMock = () => ({
  createResolution: jest.fn(),
  getAllById: jest.fn(),
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
      expect.assertions(2);
      const arr = [new ResolutionsEntity()];

      resolutionsRepository.getAllById.mockResolvedValue(arr);

      const timeHelper = jest.spyOn(TimeHelper, 'filterOutdated');
      (TimeHelper.filterOutdated as jest.Mock).mockReturnValue(arr);

      const res = await service.getAllById(1);

      expect(timeHelper).toHaveBeenCalledWith(arr);

      expect(res).toBe(arr);
    });

    it('should throw a 404 error if no resolutions found', async () => {
      expect.assertions(1);
      const arr = [];

      resolutionsRepository.getAllById.mockResolvedValue(arr);

      expect(service.getAllById(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('testing createResolution()', () => {
    it('should call the underlying repository', async () => {
      expect.assertions(1);

      const createMethod = jest.spyOn(
        resolutionsRepository,
        'createResolution',
      );

      await service.createResolution(
        new CreateResolutionDto(),
        new PatientEntity(),
      );

      expect(createMethod).toHaveBeenCalledTimes(1);
    });
  });
});
