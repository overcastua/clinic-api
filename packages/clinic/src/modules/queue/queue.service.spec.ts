import { Test } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { QueueService } from './queue.service';
import { PatientService } from 'src/modules/patient/patient.service';
import { QueueRepository } from './queue.repository';
import { QueueEntity } from './queue.entity';
import { QueuePositionService } from './positions/queuePositions.service';

const reposMock = () => ({
  findById: jest.fn(),
  add: jest.fn(),
});

const id = 1;

describe('PatientsService', () => {
  let service: QueueService;
  let positionService: QueuePositionService;
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
        {
          provide: QueuePositionService,
          useValue: {
            getIdOfFirst: jest.fn(),
            deleteCurrentAndGetNewFirst: jest.fn(),
            add: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get(QueueService);
    positionService = module.get(QueuePositionService);
    queueRepository = module.get(QueueRepository);
  });

  describe('testing add()', () => {
    it('should put the given patient to the queue', async () => {
      const addMethod = jest.spyOn(positionService, 'add');
      const queue = new QueueEntity();
      queueRepository.findById.mockResolvedValue(queue);

      await service.add(1, id);

      expect(addMethod).toHaveBeenCalledTimes(1);
      expect(addMethod).toHaveBeenCalledWith(queue, id);
    });

    it('should throw a 404 error if the queue does not exist', async () => {
      queueRepository.findById.mockResolvedValue(undefined);

      expect(service.add(1, id)).rejects.toThrow(NotFoundException);
    });
  });
});
