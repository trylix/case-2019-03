import { Test, TestingModule } from '@nestjs/testing';

import { userResponse } from '../user/mocks';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { tokenResponse } from './mocks';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            login: jest.fn().mockResolvedValue(tokenResponse),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('login', () => {
    it('should authenticate user', () => {
      expect(
        controller.login({
          email: 'teste@teste.com',
          password: '12345678',
        }),
      ).resolves.toEqual(tokenResponse);
    });
  });

  describe('logged', () => {
    it('should be get a authenticated user information', () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const mockedReq: Express.Request = {
        user: userResponse,
      } as Express.Request;

      expect(controller.logged(mockedReq)).toEqual(userResponse);
    });
  });
});
