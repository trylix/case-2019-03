import { Test, TestingModule } from '@nestjs/testing';
import { FindConditions } from 'typeorm';
import * as uuid from 'uuid';

import { UserRegisterDto } from './dto/user-register.dto';
import { UserUpdateDto } from './dto/user-update.dto';
import { userResponse, usersResponse } from './mocks';
import { UserController } from './user.controller';
import { UserEntity, UserRole } from './user.entity';
import { UserService } from './user.service';

const generatedUUID = uuid.v4();

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            fetch: jest.fn().mockResolvedValue(usersResponse),
            fetchOne: jest
              .fn()
              .mockImplementation((where: FindConditions<UserEntity>) =>
                Promise.resolve({
                  ...userResponse,
                  ...where,
                }),
              ),
            fetchByEmail: jest.fn().mockImplementation((email: string) =>
              Promise.resolve({
                ...userResponse,
                email,
              }),
            ),
            store: jest.fn().mockImplementation((userDto: UserRegisterDto) =>
              Promise.resolve({
                id: generatedUUID,
                ...userDto,
              }),
            ),
            update: jest
              .fn()
              .mockImplementation((id: string, userDto: UserUpdateDto) =>
                Promise.resolve({
                  id: generatedUUID,
                  ...userDto,
                }),
              ),
            delete: jest.fn().mockResolvedValue({
              deleted: true,
            }),
          },
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getUsers', () => {
    it('should get an array of users', () => {
      expect(controller.getUsers()).resolves.toEqual(usersResponse);
    });
  });

  describe('store', () => {
    it('should create a new user', () => {
      const newUserDto: UserRegisterDto = {
        name: 'Teste 1',
        email: 'teste@teste.com',
        password: '12345678',
        role: UserRole.DOCTOR,
      };

      expect(controller.store(newUserDto)).resolves.toEqual({
        id: generatedUUID,
        ...newUserDto,
      });
    });
  });

  describe('update', () => {
    it('should update a user', () => {
      const newUserDto: UserUpdateDto = {
        name: 'Teste 1',
        email: 'teste@teste.com',
        password: '12345678',
        role: UserRole.DOCTOR,
      };

      expect(controller.update(generatedUUID, newUserDto)).resolves.toEqual({
        id: generatedUUID,
        ...newUserDto,
      });
    });
  });

  describe('getUserById', () => {
    it('should get a single user', () => {
      const generatedUUIDOne = uuid.v4();
      const generatedUUIDTwo = uuid.v4();

      expect(controller.getUserById(generatedUUIDOne)).resolves.toEqual({
        ...userResponse,
        id: generatedUUIDOne,
      });

      expect(controller.getUserById(generatedUUIDTwo)).resolves.toEqual({
        ...userResponse,
        id: generatedUUIDTwo,
      });
    });
  });

  describe('delete', () => {
    it('should return that it deleted a user', () => {
      expect(controller.delete(generatedUUID)).resolves.toEqual({
        deleted: true,
      });
    });

    it('should return that it did not delete a cat', () => {
      const deleteSpy = jest.spyOn(service, 'delete').mockResolvedValueOnce(
        Promise.resolve({
          deleted: false,
        }),
      );

      expect(controller.delete('a uuid that does not exist')).resolves.toEqual({
        deleted: false,
      });

      expect(deleteSpy).toBeCalledWith('a uuid that does not exist');
    });
  });
});
