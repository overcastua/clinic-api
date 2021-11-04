import { Test } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { SpecializationsService } from './specializations.service';
import { SpecializationsRepository } from './specializations.repository';
import { DoctorsService } from '../doctors/doctors.service';

const reposMock = () => ({
  findById: jest.fn(),
  findAll: jest.fn(),
});

describe('SpecializationsService', () => {
  let service: SpecializationsService;
  let repository: any;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        SpecializationsService,
        {
          provide: SpecializationsRepository,
          useFactory: reposMock,
        },
        {
          provide: DoctorsService,
          useValue: {
            getDoctorsQueueIdByDoctorId: jest.fn(),
            getAllDoctorsOfCertainSpecialization: jest.fn(),
            findDoctorByUserId: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get(SpecializationsService);
    repository = module.get(SpecializationsRepository);
  });

  describe('testing getAllDoctorsOfCertainSpecialization()', () => {
    it('should throw 404 error if specialization is not valid (does not exist)', async () => {
      expect.assertions(1);

      repository.findById.mockResolvedValue(undefined);

      expect(service.getAllDoctorsOfCertainSpecialization(1)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
