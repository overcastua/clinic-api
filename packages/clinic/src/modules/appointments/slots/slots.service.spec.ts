import { Test } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { PatientService } from '../../patient/patient.service';
import { PatientEntity } from '../../patient/patient.entity';
import { TimeSlotsService } from './slots.service';
import { TimeSlotsRepository } from './slots.repository';
import { TimeSlotsEntity } from './slots.entity';
import { WorkdaysEntity } from '../workdays.entity';

const reposMock = () => ({
  add: jest.fn(),
  getFirst: jest.fn(),
  deleteFirst: jest.fn(),
});

const data = new TimeSlotsEntity();
const id = 1;
data.patient = new PatientEntity(id);
data.patient.id = 1;

const queueId = 1;

describe('PatientsService', () => {
  let service: TimeSlotsService;
  let patientService: PatientService;
  let appointmentsRepository: any;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TimeSlotsService,
        {
          provide: TimeSlotsRepository,
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

    service = module.get(TimeSlotsService);
    appointmentsRepository = module.get(TimeSlotsRepository);
    patientService = module.get(PatientService);
  });

  describe('testing getIdOfFirst()', () => {
    it('should return the id of the first patient in the queue', async () => {
      expect.assertions(1);
      appointmentsRepository.getFirst.mockResolvedValue(data);

      const res = await service.getIdOfFirst(queueId);

      expect(res).toBe(id);
    });

    it('should throw a 404 error if the queue is empty', async () => {
      expect.assertions(1);

      appointmentsRepository.getFirst.mockResolvedValue(undefined);

      expect(service.getIdOfFirst(queueId)).rejects.toThrow(NotFoundException);
    });
  });

  describe('testing deleteCurrentAndGetNewFirst()', () => {
    it('should return the id of the next patient in the queue', async () => {
      expect.assertions(1);
      appointmentsRepository.getFirst.mockResolvedValue(data);

      const res = await service.getIdOfFirst(queueId);

      expect(res).toBe(id);
    });
  });

  describe('testing add()', () => {
    it('should put the given patients id to the queue', async () => {
      const addMethod = jest.spyOn(appointmentsRepository, 'add');
      const patient = new PatientEntity(1);
      const queue = new WorkdaysEntity();
      (patientService.findPatientByUserId as jest.Mock).mockResolvedValue(
        patient,
      );

      await service.add(queue, 1);

      expect(addMethod).toHaveBeenCalledTimes(1);
      expect(addMethod).toHaveBeenCalledWith(queue, patient);
    });
  });
});
