import { Test } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { PatientService } from '../../patient/patient.service';
import { PatientEntity } from '../../patient/patient.entity';
import { QueuePositionService } from './queuePositions.service';
import { QueuePositionRepository } from './queuePositions.repository';
import { QueuePositionEntity } from './queuePositions.entity';
import { QueueEntity } from '../queue.entity';

const reposMock = () => ({
  add: jest.fn(),
  getFirst: jest.fn(),
  deleteFirst: jest.fn(),
});

const data = new QueuePositionEntity();
data.patient = new PatientEntity();
const id = 1;
data.patient.id = id;

const queueId = 1;

describe('PatientsService', () => {
  let service: QueuePositionService;
  let patientService: PatientService;
  let queueRepository: any;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        QueuePositionService,
        {
          provide: QueuePositionRepository,
          useFactory: reposMock,
        },
        {
          provide: PatientService,
          useValue: {
            findPatientByUserId: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get(QueuePositionService);
    queueRepository = module.get(QueuePositionRepository);
    patientService = module.get(PatientService);
  });

  describe('testing getIdOfFirst()', () => {
    it('should return the id of the first patient in the queue', async () => {
      expect.assertions(1);
      queueRepository.getFirst.mockResolvedValue(data);

      const res = await service.getIdOfFirst(queueId);

      expect(res).toBe(id);
    });

    it('should throw a 404 error if the queue is empty', async () => {
      expect.assertions(1);

      queueRepository.getFirst.mockResolvedValue(undefined);

      expect(service.getIdOfFirst(queueId)).rejects.toThrow(NotFoundException);
    });
  });

  describe('testing deleteCurrentAndGetNewFirst()', () => {
    it('should return the id of the next patient in the queue', async () => {
      expect.assertions(1);
      queueRepository.getFirst.mockResolvedValue(data);

      const res = await service.getIdOfFirst(queueId);

      expect(res).toBe(id);
    });
  });

  describe('testing add()', () => {
    it('should put the given patients id to the queue', async () => {
      const addMethod = jest.spyOn(queueRepository, 'add');
      const patient = new PatientEntity();
      const queue = new QueueEntity();
      (patientService.findPatientByUserId as jest.Mock).mockResolvedValue(
        patient,
      );

      await service.add(queue, 1);

      expect(addMethod).toHaveBeenCalledTimes(1);
      expect(addMethod).toHaveBeenCalledWith(queue, patient);
    });
  });
});
