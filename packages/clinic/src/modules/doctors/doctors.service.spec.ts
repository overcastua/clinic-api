import { Test } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { DoctorsRepository } from './doctors.repository';
import { DoctorEntity } from './doctors.entity';

const reposMock = () => ({
  getDoctorById: jest.fn(),
  getAllBySpecializationId: jest.fn(),
  getDoctorByUserId: jest.fn(),
});

describe('DoctorsService', () => {
  let service: DoctorsService;
  let repository: any;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        DoctorsService,
        {
          provide: DoctorsRepository,
          useFactory: reposMock,
        },
      ],
    }).compile();

    service = module.get(DoctorsService);
    repository = module.get(DoctorsRepository);
  });

  describe('testing getAllDoctorsOfCertainSpecialization()', () => {
    it('should return all the doctors for the given specialization', async () => {
      expect.assertions(1);
      const arr = [new DoctorEntity()];

      repository.getAllBySpecializationId.mockResolvedValue(arr);

      const res = await service.getAllDoctorsOfCertainSpecialization(1);

      expect(res).toBe(arr);
    });

    it('should throw a 404 error if no resolutions found', async () => {
      expect.assertions(1);
      const arr = [];

      repository.getAllBySpecializationId.mockResolvedValue(arr);

      expect(service.getAllDoctorsOfCertainSpecialization(1)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
