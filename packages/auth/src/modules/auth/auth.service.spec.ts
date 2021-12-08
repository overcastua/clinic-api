import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import * as bcrypt from 'bcrypt';
import { Role } from '@repos/common';

describe('PatientService', () => {
  let service: AuthService;
  let userService: UsersService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          },
        },
        {
          provide: UsersService,
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get(AuthService);
    userService = module.get(UsersService);
    jwtService = module.get(JwtService);
  });

  describe('testing validateUser()', () => {
    it('should return null if passwords do not match', async () => {
      expect.assertions(1);

      const res = await service.validateUser('e@gmail.com', '1234');

      expect(res).toBeNull();
    });

    it('should return user data if passwords match', async () => {
      expect.assertions(1);
      const user = {
        password: '1234',
        id: 1,
        name: 'Dima',
      };
      const result = { id: 1, name: 'Dima' };

      (userService.findOne as jest.Mock).mockResolvedValue(user);

      const bcryptCompare = jest.fn().mockResolvedValue(true);
      (bcrypt.compare as jest.Mock) = bcryptCompare;

      const res = await service.validateUser('e@gmail.com', '1234');

      expect(res).toStrictEqual(result);
    });
  });

  describe('testing login()', () => {
    it('should return null if passwords do not match', async () => {
      expect.assertions(1);

      const user = { id: 1 };

      const fakeToken = 'abcdefghijklmnop';

      (jwtService.sign as jest.Mock).mockReturnValue(fakeToken);

      (userService.findOne as jest.Mock).mockResolvedValue(user);

      const res = await service.login('a@gmail.com', Role.PATIENT);

      expect(res).toStrictEqual({ access_token: fakeToken });
    });
  });
});
