import { ConflictException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { ClinicService } from '../clinic/clinic.service';
import { ProfileService } from '../profile/profile.service';
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
  let config: ConfigService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn(),
          },
        },
        {
          provide: UsersRepository,
          useFactory: reposMock,
        },
        {
          provide: ClinicService,
          useValue: {
            createPatient: jest.fn(),
          },
        },
        {
          provide: ProfileService,
          useValue: {
            createProfile: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get(UsersService);
    userRepository = module.get(UsersRepository);
    config = module.get(ConfigService);

    (config.get as jest.Mock).mockImplementation((variable: 'salt'): number => {
      const env = {
        salt: 10,
      };

      return env[variable];
    });
  });

  describe('testing register()', () => {
    it('should throw 409 if email is already taken', async () => {
      expect.assertions(1);

      const payload = new RegisterDto();
      payload.password = '1234';
      payload.email = 'test@gmail.com';

      userRepository.findUser.mockResolvedValue({
        text: 'something not empty',
      });

      expect(service.register(payload)).rejects.toThrow(ConflictException);
    });

    it('should return nothing if payload is valid', async () => {
      const payload = new RegisterDto();
      payload.password = '1234';
      payload.email = 'test@gmail.com';

      userRepository.findUser.mockResolvedValue(undefined);
      userRepository.register.mockResolvedValue({ id: 1 });

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
