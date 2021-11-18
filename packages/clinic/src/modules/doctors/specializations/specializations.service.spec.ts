import { Test } from '@nestjs/testing';
import { SpecializationsService } from './specializations.service';
import { SpecializationsRepository } from './specializations.repository';
import { DoctorsService } from '../doctors.service';

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

  describe('testing getAll()', () => {
    it('should return list of specializations', async () => {
      expect.assertions(1);
      const list = ['spec1', 'spec2', 'spec3', 'spec4', 'spec5'];

      repository.findAll.mockResolvedValue(list);

      expect(await service.getAll()).toBe(list);
    });
  });
});
