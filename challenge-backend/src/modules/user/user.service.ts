import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as moment from 'moment';
import { Between, FindConditions, Raw, Repository } from 'typeorm';

import { UserDeleteDto } from './dto/user-delete.dto';
import { UserFetchResponseDto } from './dto/user-fetch-response.dto';
import { UserFetchDto } from './dto/user-fetch.dto';
import { UserRegisterDto } from './dto/user-register.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { UserUpdateDto } from './dto/user-update.dto';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) {}

  private readonly logger = new Logger('user.service');

  async fetch({
    take,
    skip,
    name,
    initialDate,
    endDate,
    orderKeyword,
    orderBy,
  }: UserFetchDto): Promise<UserFetchResponseDto> {
    const order: { [P in keyof UserEntity]?: 'ASC' | 'DESC' | 1 | -1 } = {};

    order[orderKeyword] = orderBy;

    const where: FindConditions<UserEntity> = {};

    if (name) {
      where['name'] = Raw(alias => `${alias} ILIKE '%${name}%'`);
    }

    if (initialDate) {
      const pEndDate = endDate || moment().unix();

      where['createdAt'] = Between(initialDate, pEndDate);
    }

    try {
      const [data, rows] = await this.userRepo.findAndCount({
        where,
        take,
        skip,
        order,
      });

      return {
        data,
        rows,
      };
    } catch (err) {
      this.logger.error(`error while trying to fetch users ${err}`);
      throw err;
    }
  }

  async fetchOne(where: FindConditions<UserEntity>): Promise<UserResponseDto> {
    try {
      const user = await this.userRepo.findOne({
        where,
      });

      if (!user) {
        throw new HttpException(
          `No users with ${JSON.stringify(where)} were found`,
          HttpStatus.NOT_FOUND,
        );
      }

      return user.toResponseObject();
    } catch (err) {
      this.logger.error(`error while trying to fetch user ${err}`);
      throw err;
    }
  }

  async fetchByEmail(email: string): Promise<UserEntity> {
    try {
      const user = await this.userRepo.findOne({
        email,
      });

      return user;
    } catch (err) {
      this.logger.error(`error while trying to fetch user by email ${err}`);
      throw err;
    }
  }

  async store(userDto: UserRegisterDto): Promise<UserResponseDto> {
    try {
      const userWithEmail = await this.fetchByEmail(userDto.email);

      if (userWithEmail) {
        throw new HttpException(
          'Email is already in use',
          HttpStatus.BAD_REQUEST,
        );
      }

      const user = this.userRepo.create(userDto);

      const now = moment().unix();

      user.createdAt = now;
      user.updatedAt = now;

      const createdUser = await this.userRepo.save(user);

      return createdUser.toResponseObject();
    } catch (err) {
      this.logger.error(`error while trying to register a user ${err}`);
      throw err;
    }
  }

  async update(id: string, userDto: UserUpdateDto): Promise<UserResponseDto> {
    try {
      if (userDto.email) {
        const userWithEmail = await this.fetchByEmail(userDto.email);

        if (userWithEmail) {
          throw new HttpException(
            'Email is already in use',
            HttpStatus.BAD_REQUEST,
          );
        }
      }

      const user = await this.fetchOne({
        id,
      });

      if (!user) {
        throw new HttpException(
          `No users with this ID ${id} were found`,
          HttpStatus.NOT_FOUND,
        );
      }

      const updatedUser = this.userRepo.create({
        ...user,
        ...userDto,
      });

      await this.userRepo.save(updatedUser);

      return updatedUser.toResponseObject();
    } catch (err) {
      this.logger.error(`error while trying to update a user ${err}`);
      throw err;
    }
  }

  async delete(ids: string | string[]): Promise<UserDeleteDto> {
    try {
      const deleteRow = async (id: string) => {
        const user = await this.fetchOne({
          id,
        });

        if (!user) {
          throw new HttpException(
            `No users with this ID ${id} were found`,
            HttpStatus.NOT_FOUND,
          );
        }

        await this.userRepo.delete(id);
      };

      if (Array.isArray(ids)) {
        await Promise.all(ids.map(id => deleteRow(id)));
      } else {
        await deleteRow(ids as string);
      }

      return {
        deleted: true,
      };
    } catch (err) {
      this.logger.error(`error while trying to update a user ${err}`);
      throw err;
    }
  }
}
