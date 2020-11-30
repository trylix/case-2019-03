import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as moment from 'moment';
import { Between, FindConditions, Repository } from 'typeorm';

import { MedicationService } from '../medication/medication.service';
import { UserRole } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { PrescriptionFetchResponseDto } from './dto/prescription-fetch-response.dto';
import { PrescriptionFetchDto } from './dto/prescription-fetch.dto';
import { PrescriptionResponseDto } from './dto/prescription-response.dto';
import { RegisterPrescriptionDto } from './dto/register-prescription.dto';
import { PrescriptionEntity } from './prescription.entity';

@Injectable()
export class PrescriptionService {
  constructor(
    @InjectRepository(PrescriptionEntity)
    private readonly prescriptionRepo: Repository<PrescriptionEntity>,

    private readonly medicationService: MedicationService,

    private readonly userService: UserService,
  ) {}

  private readonly logger = new Logger('prescription.service');

  async fetch({
    take,
    skip,
    doctor,
    initialDate,
    endDate,
    orderBy,
  }: PrescriptionFetchDto): Promise<PrescriptionFetchResponseDto> {
    const order: {
      [P in keyof PrescriptionEntity]?: 'ASC' | 'DESC' | 1 | -1;
    } = {};

    order['createdAt'] = orderBy;

    const where: FindConditions<PrescriptionEntity> = {};

    if (initialDate) {
      const pEndDate = endDate || moment().unix();

      where['createdAt'] = Between(initialDate, pEndDate);
    }

    if (doctor) {
      const doctorEntity = await this.userService.fetchOne({
        id: doctor,
        role: UserRole.DOCTOR,
      });

      if (!doctor) {
        throw new HttpException(
          `No doctor users with ID ${doctor} were found`,
          HttpStatus.NOT_FOUND,
        );
      }

      where['doctor'] = doctorEntity;
    }

    try {
      const [data, rows] = await this.prescriptionRepo.findAndCount({
        where,
        take,
        skip,
        order,
        relations: ['medications', 'pacient', 'doctor'],
      });

      return {
        data,
        rows,
      };
    } catch (err) {
      this.logger.error(`error while trying to fetch prescriptions ${err}`);
      throw err;
    }
  }

  async store(
    registerDto: RegisterPrescriptionDto,
  ): Promise<PrescriptionResponseDto> {
    try {
      const medications = await this.medicationService.getMedicationsFromIds(
        registerDto.medications,
      );

      const possibleInteractions = await this.medicationService.getPossibleInteractionsFromMedications(
        medications,
      );

      const doctor = await this.userService.fetchOne({
        id: registerDto.doctor,
        role: UserRole.DOCTOR,
      });

      if (!doctor) {
        throw new HttpException(
          `No doctor users with ID ${registerDto.doctor} were found`,
          HttpStatus.NOT_FOUND,
        );
      }

      const pacient = await this.userService.fetchOne({
        id: registerDto.pacient,
        role: UserRole.PATIENT,
      });

      if (!pacient) {
        throw new HttpException(
          `No patient users with ID ${registerDto.pacient} were found`,
          HttpStatus.NOT_FOUND,
        );
      }

      const prescriptionToSave = this.prescriptionRepo.create({
        ...registerDto,
        medications,
        doctor,
        pacient,
      });

      const now = moment().unix();

      prescriptionToSave.createdAt = now;
      prescriptionToSave.updatedAt = now;

      const prescription = await this.prescriptionRepo.save(prescriptionToSave);

      return {
        prescription,
        possibleInteractions,
      };
    } catch (err) {
      this.logger.error(`error while trying to create a prescription ${err}`);
      throw err;
    }
  }
}
