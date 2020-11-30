import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';

import { PrescriptionOrderBy } from '../prescription.entity';

export class PrescriptionFetchDto {
  @ApiProperty({
    description: 'Number of results to take',
    default: 20,
    required: false,
  })
  @IsString()
  @IsOptional()
  readonly take?: number = 20;

  @ApiProperty({
    description: 'Number of results to be skipped',
    default: 0,
    required: false,
  })
  @IsString()
  @IsOptional()
  readonly skip?: number = 0;

  @ApiProperty({
    description: 'Doctor ID',
    required: false,
  })
  @IsString()
  @IsOptional()
  readonly doctor?: string;

  @ApiProperty({
    description: 'Initial date in unix time',
    required: false,
  })
  @IsString()
  @IsOptional()
  readonly initialDate?: number;

  @ApiProperty({
    description: 'End date in unix time',
    required: false,
  })
  @IsString()
  @IsOptional()
  readonly endDate?: number;

  @ApiProperty({
    description: 'Results order',
    enum: PrescriptionOrderBy,
    default: PrescriptionOrderBy.DESC,
    required: false,
  })
  @IsEnum(PrescriptionOrderBy)
  @IsOptional()
  readonly orderBy?: PrescriptionOrderBy = PrescriptionOrderBy.DESC;
}
