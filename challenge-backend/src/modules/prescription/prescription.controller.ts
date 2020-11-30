import { Body, Controller, Get, HttpCode, Post, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse
} from '@nestjs/swagger';
import { HttpLoggingInterceptor } from 'src/interceptors/http-logging.interceptor';

import { PrescriptionFetchResponseDto } from './dto/prescription-fetch-response.dto';
import { PrescriptionFetchDto } from './dto/prescription-fetch.dto';
import { PrescriptionResponseDto } from './dto/prescription-response.dto';
import { RegisterPrescriptionDto } from './dto/register-prescription.dto';
import { PrescriptionService } from './prescription.service';

@UseInterceptors(HttpLoggingInterceptor)
@Controller('prescriptions')
@ApiTags('Prescription')
@ApiInternalServerErrorResponse({
  description: 'Internal server error',
})
export class PrescriptionController {
  constructor(private readonly prescriptionService: PrescriptionService) {}

  @Get()
  @ApiOkResponse({
    description: 'Returns information for all prescriptions',
    type: PrescriptionFetchResponseDto,
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('jwt'))
  async getUsers(
    @Query() fetchDto?: PrescriptionFetchDto,
  ): Promise<PrescriptionFetchResponseDto> {
    return this.prescriptionService.fetch(fetchDto);
  }

  @Post()
  @ApiCreatedResponse({
    description: 'Returns the information of the registered prescription',
    type: PrescriptionResponseDto,
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('jwt'))
  @HttpCode(201)
  async store(
    @Body() registerDto: RegisterPrescriptionDto,
  ): Promise<PrescriptionResponseDto> {
    return this.prescriptionService.store(registerDto);
  }
}
