import { Test } from '@nestjs/testing';
import { PatientService } from './patient.service';
import { PatientRepository } from './patient.repository';
import { ResolutionsService } from 'src/resolutions/resolutions.service';
import { NotFoundException } from '@nestjs/common';
import { CreateResolutionDto } from './dto/create-resolution.dto';
import { ResolutionsEntity } from 'src/resolutions/resolutions.entity';

const reposMock = () => ({
  add: jest.fn(),
  findById: jest.fn(),
});

const data = {
  id: '1',
  name: 'someone',
};

describe('PatientsService', () => {
  let service: PatientService;
  let resolutionsService: ResolutionsService;
  let patientRepository: any;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        PatientService,
        {
          provide: PatientRepository,
          useFactory: reposMock,
        },
        {
          provide: ResolutionsService,
          useValue: {
            getAllById: jest.fn(),
            createResolution: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get(PatientService);
    patientRepository = module.get(PatientRepository);
    resolutionsService = module.get(ResolutionsService);
  });

  describe('testing create()', () => {
    it('should call the underlying repository', async () => {
      jest.spyOn(patientRepository, 'add');

      await service.create(null);

      expect(patientRepository.add).toBeCalledTimes(1);
    });
  });

  describe('testing findById()', () => {
    it('should return what the underlying repository returns', async () => {
      expect.assertions(1);
      patientRepository.findById.mockResolvedValue(data);

      const result = await service.findById(1);

      expect(result).toEqual(data);
    });

    it('should throw a 404 error if patient with the given id does not exist', async () => {
      expect.assertions(1);

      patientRepository.findById.mockResolvedValue(undefined);

      expect(service.findById(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('testing createResolution()', () => {
    it('should call the resolutions service', async () => {
      jest.spyOn(resolutionsService, 'createResolution');
      patientRepository.findById.mockResolvedValue(data);

      await service.createResolution(new CreateResolutionDto(), 1);

      expect(resolutionsService.createResolution).toBeCalledTimes(1);
    });

    it('should throw a 404 error if patient with the given id does not exist', async () => {
      expect.assertions(1);

      patientRepository.findById.mockResolvedValue(undefined);

      expect(
        service.createResolution(new CreateResolutionDto(), 11),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('testing getAllResolutionsById()', () => {
    it('should return an array of resolutions for the given patient', async () => {
      patientRepository.findById.mockResolvedValue(data);

      (resolutionsService.getAllById as jest.Mock).mockResolvedValue([
        new ResolutionsEntity(),
      ]);

      const [response] = await service.getAllResolutionsById(1);

      expect(response.constructor).toBe(ResolutionsEntity);
    });
  });
});
