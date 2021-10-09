import { Test } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { QueueService } from './queue.service';
import { PatientService } from 'src/patient/patient.service';
import { QueueRepository } from './queue.repository';
import { QueueEntity } from './queue.entity';
import { PatientEntity } from 'src/patient/patient.entity';
import { AddToQueueDto } from './dto/add-to-queue.dto';

const reposMock = () => ({
  add: jest.fn(),
  getFirst: jest.fn(),
  deleteFirst: jest.fn(),
});

const data = new QueueEntity();
data.patient = new PatientEntity();
const id = 1;
data.patient.id = id;

describe('PatientsService', () => {
  let service: QueueService;
  let patientService: PatientService;
  let queueRepository: any;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        QueueService,
        {
          provide: QueueRepository,
          useFactory: reposMock,
        },
        {
          provide: PatientService,
          useValue: {
            findById: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get(QueueService);
    queueRepository = module.get(QueueRepository);
    patientService = module.get(PatientService);
  });

  describe('testing getIdOfFirst()', () => {
    it('should return the id of the first patient in the queue', async () => {
      expect.assertions(1);
      queueRepository.getFirst.mockResolvedValue(data);

      const res = await service.getIdOfFirst();

      expect(res).toBe(id);
    });

    it('should throw a 404 error if the queue is empty', async () => {
      expect.assertions(1);

      queueRepository.getFirst.mockResolvedValue(undefined);

      expect(service.getIdOfFirst()).rejects.toThrow(NotFoundException);
    });
  });

  describe('testing deleteCurrentAndGetNewFirst()', () => {
    it('should return the id of the next patient in the queue', async () => {
      expect.assertions(1);
      queueRepository.getFirst.mockResolvedValue(data);

      const res = await service.getIdOfFirst();

      expect(res).toBe(id);
    });
  });

  describe('testing add()', () => {
    it('should put the given patient to the queue', async () => {
      const addMethod = jest.spyOn(queueRepository, 'add');
      const patient = new PatientEntity();
      (patientService.findById as jest.Mock).mockResolvedValue(patient);

      await service.add(new AddToQueueDto());

      expect(addMethod).toHaveBeenCalledTimes(1);
      expect(addMethod).toHaveBeenCalledWith(patient);
    });
  });
});
