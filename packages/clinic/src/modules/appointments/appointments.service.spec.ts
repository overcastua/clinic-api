import { Test } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { PatientService } from '../patient/patient.service';
import { WorkdaysEntity } from './workdays.entity';
import { TimeSlotsService } from './slots/slots.service';
import { WorkdaysRepository } from './workdays.repository';

const reposMock = () => ({
  findById: jest.fn(),
  add: jest.fn(),
});

const id = 1;

describe('PatientsService', () => {
  let service: AppointmentsService;
  let positionService: TimeSlotsService;
  let appointmentsRepository: any;
  let patientService: PatientService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AppointmentsService,
        {
          provide: WorkdaysRepository,
          useFactory: reposMock,
        },
        {
          provide: PatientService,
          useValue: {
            findPatientByUserId: jest.fn(),
          },
        },
        {
          provide: TimeSlotsService,
          useValue: {
            getIdOfFirst: jest.fn(),
            deleteCurrentAndGetNewFirst: jest.fn(),
            add: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get(AppointmentsService);
    positionService = module.get(TimeSlotsService);
    patientService = module.get(PatientService);
    appointmentsRepository = module.get(WorkdaysRepository);
  });

  describe('testing add()', () => {
    it('should put the given patient to the queue', async () => {
      const addMethod = jest.spyOn(positionService, 'add');
      const queue = new WorkdaysEntity();

      const patient = { id: 5 };

      appointmentsRepository.findById.mockResolvedValue(queue);
      (patientService.findPatientByUserId as jest.Mock).mockResolvedValue(
        patient,
      );

      await service.add(1, id);

      expect(addMethod).toHaveBeenCalledTimes(1);
      expect(addMethod).toHaveBeenCalledWith(queue, patient.id);
    });

    it('should throw a 404 error if the queue does not exist', async () => {
      appointmentsRepository.findById.mockResolvedValue(undefined);

      expect(service.add(1, id)).rejects.toThrow(NotFoundException);
    });
  });
});
