import { ConflictException, ForbiddenException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { PatientService } from 'src/patient/patient.service';
import { RegisterDto } from './dto/register-user.dto';
import { UsersRepository } from './users.repository';
import { UsersService } from './users.service';

const reposMock = () => ({
  findUser: jest.fn(),
  register: jest.fn(),
});

describe('UsersService', () => {
  let service: UsersService;
  let userRepository: any;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: UsersRepository,
          useFactory: reposMock,
        },
        {
          provide: PatientService,
          useValue: {
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get(UsersService);
    userRepository = module.get(UsersRepository);
  });

  describe('testing register()', () => {
    it('should throw 403 if passwords do not match', async () => {
      expect.assertions(1);

      const payload = new RegisterDto();
      payload.password = '1234';
      payload.confirmPassword = '12345';

      jest.spyOn(userRepository, 'register');

      expect(service.register(payload)).rejects.toThrow(ForbiddenException);
    });

    it('should throw 409 if email is already taken', async () => {
      expect.assertions(1);

      const payload = new RegisterDto();
      payload.password = '1234';
      payload.confirmPassword = '1234';
      payload.email = 'test@gmail.com';

      userRepository.findUser.mockResolvedValue({
        text: 'something not empty',
      });

      expect(service.register(payload)).rejects.toThrow(ConflictException);
    });

    it('should return nothing if payload is valid', async () => {
      const payload = new RegisterDto();
      payload.password = '1234';
      payload.confirmPassword = '1234';
      payload.email = 'test@gmail.com';

      userRepository.findUser.mockResolvedValue(undefined);
      userRepository.register.mockResolvedValue(undefined);

      await service.register(payload);
    });
  });

  describe('testing findOne()', () => {
    it('should call the underlying repository', async () => {
      expect.assertions(2);
      const email = 'test@gmail.com';
      const spyOnFindUser = jest.spyOn(userRepository, 'findUser');
      await service.findOne(email);

      expect(spyOnFindUser).toHaveBeenCalledTimes(1);
      expect(spyOnFindUser).toHaveBeenCalledWith(email);
    });
  });
});
