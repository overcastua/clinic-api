import { ConflictException, ForbiddenException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { ClinicService } from '../clinic/clinic.service';
import { ProfileService } from '../profile/profile.service';
import { RegisterDto } from './dto/register-user.dto';
import { UsersRepository } from './users.repository';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';
import { ChangePasswordDto } from './dto/change-password.dto';
import { Gender } from '@repos/common';

const reposMock = () => ({
  findUser: jest.fn(),
  register: jest.fn(),
  updateById: jest.fn(),
  findUserById: jest.fn(),
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
      const data = {
        password: '1234',
        email: 'test@gmail.com',
        name: 'a',
        gender: Gender.MALE,
        birthDate: new Date(),
      };

      const payload = new RegisterDto(data);

      userRepository.findUser.mockResolvedValue({
        text: 'something not empty',
      });

      expect(service.register(payload)).rejects.toThrow(ConflictException);
    });

    it('should return nothing if payload is valid', async () => {
      const data = {
        password: '1234',
        email: 'test@gmail.com',
        name: 'a',
        gender: Gender.MALE,
        birthDate: new Date(),
      };

      const payload = new RegisterDto(data);

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

  describe('testing changePassword()', () => {
    it('should throw ForbiddenException if new password and current are the same', async () => {
      expect.assertions(1);

      userRepository.findUserById.mockResolvedValue({});
      (bcrypt.compare as jest.Mock) = jest.fn().mockResolvedValue(true);
      const data = { current: '1234', new: '1234' };
      const payload = new ChangePasswordDto(data);

      expect(service.changePassword(payload, 1)).rejects.toThrow(
        ForbiddenException,
      );
    });

    it("should throw ForbiddenException if current password doesn't match", async () => {
      expect.assertions(1);

      userRepository.findUserById.mockResolvedValue({ password: '4321' });
      (bcrypt.compare as jest.Mock) = jest.fn().mockResolvedValue(false);
      const data = { current: '1234', new: '12345' };
      const payload = new ChangePasswordDto(data);

      expect(service.changePassword(payload, 1)).rejects.toThrow(
        ForbiddenException,
      );
    });

    it('should update user by id if everything is ok', async () => {
      expect.assertions(1);

      const hash = 'hdushd2141d/dasdkqFHajsndwh';
      const spy = jest.spyOn(userRepository, 'updateById');
      const user = { password: '1234' };
      const updatedUser = { password: hash };

      const data = { current: '1234', new: '12345' };
      const payload = new ChangePasswordDto(data);

      userRepository.findUserById.mockResolvedValue(user);
      (bcrypt.compare as jest.Mock) = jest.fn().mockResolvedValue(true);
      (bcrypt.hash as jest.Mock) = jest.fn().mockResolvedValue(hash);
      (config.get as jest.Mock).mockReturnValue(10);

      await service.changePassword(payload, 1);

      expect(spy).toHaveBeenLastCalledWith(updatedUser);
    });
  });
});
