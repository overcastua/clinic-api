import { Test } from '@nestjs/testing';
import { PatientService } from '../../patient/patient.service';
import { PatientEntity } from '../../patient/patient.entity';
import { TimeSlotsService } from './slots.service';
import { TimeSlotsRepository } from './slots.repository';
import { TimeSlotsEntity } from './slots.entity';
import { NotFoundException } from '@nestjs/common';
import { CreateAppointmentDto } from '../dto/create-appointment.dto';

const reposMock = () => ({
  doctorGetAllFuture: jest.fn(),
  doctorGetClosest: jest.fn(),
  patientGetAllAppointments: jest.fn(),
  setUp: jest.fn(),
  doctorFinishCurrent: jest.fn(),
  getAllForDate: jest.fn(),
});

const data = new TimeSlotsEntity();
const id = 1;
data.patient = new PatientEntity(id);
data.patient.id = 1;
data.time = '12:00';
data.isFree = false;
data.isFinished = false;

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

  describe('testing doctorGetClosest()', () => {
    it('should return the closest appointment', async () => {
      expect.assertions(1);
      appointmentsRepository.doctorGetClosest.mockResolvedValue(data);

      const res = await service.doctorGetClosest(1);

      expect(res).toBe(data);
    });

    it('should throw a 404 error if there is no future appointments', async () => {
      expect.assertions(1);

      appointmentsRepository.doctorGetClosest.mockResolvedValue(undefined);

      expect(service.doctorGetClosest(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('testing doctorFinishCurrentAndGetClosest()', () => {
    it('should return the next closest appointment', async () => {
      expect.assertions(1);

      const newData = data;
      newData.patient.id = 2;
      appointmentsRepository.doctorFinishCurrent.mockResolvedValue(data);
      appointmentsRepository.doctorGetClosest.mockResolvedValue(newData);

      const res = await service.doctorFinishCurrentAndGetClosest(1);

      expect(res).toBe(newData);
    });
  });

  describe('testing add()', () => {
    it('should create an appointment for the given patient with the given doctor', async () => {
      const patient = new PatientEntity(1);
      const dto = new CreateAppointmentDto({ date: new Date(), time: '12:00' });

      const setUpMethod = jest.spyOn(appointmentsRepository, 'setUp');
      (patientService.findPatientByUserId as jest.Mock).mockResolvedValue(
        patient,
      );
      appointmentsRepository.setUp.mockResolvedValue({ isFree: false });

      await service.add(dto, 1, 1);

      expect(setUpMethod).toHaveBeenCalledTimes(1);
      expect(setUpMethod).toHaveBeenCalledWith(dto, patient, 1);
    });

    it('should throw NotFoundException if there is no free slot for this time or date', async () => {
      const patient = new PatientEntity(1);
      const dto = new CreateAppointmentDto({ date: new Date(), time: '12:00' });

      (patientService.findPatientByUserId as jest.Mock).mockResolvedValue(
        patient,
      );

      expect(service.add(dto, 1, 1)).rejects.toThrow(NotFoundException);
    });
  });
});
