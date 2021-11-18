import { Test } from '@nestjs/testing';
import { ResolutionsService } from './resolutions.service';
import { ResolutionsRepository } from './resolutions.repository';
import { ResolutionsEntity } from './resolutions.entity';
import { DoctorsService } from '../doctors/doctors.service';
import { PatientService } from '../patient/patient.service';

const reposMock = () => ({
  createResolution: jest.fn(),
  getAllByPatientId: jest.fn(),
  deleteResolution: jest.fn(),
  updateResolution: jest.fn(),
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
        {
          provide: DoctorsService,
          useValue: {
            findDoctorByUserId: jest.fn(),
          },
        },
        {
          provide: PatientService,
          useValue: {
            findPatientByUserId: jest.fn(),
          },
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

      expect(await service.getAllById(1)).toBe(arr);
    });

    it('should return an empty array if no resolutions were found', async () => {
      expect.assertions(1);

      const arr = [];
      resolutionsRepository.getAllByPatientId.mockResolvedValue(arr);

      expect(await service.getAllById(1)).toBe(arr);
    });
  });

  // describe('testing createResolution()', () => {});
  // describe('testing updateResolution()', () => {});
  // describe('testing deleteResolution()', () => {});
});
