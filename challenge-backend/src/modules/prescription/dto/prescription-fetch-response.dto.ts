import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNumber } from 'class-validator';

import { PrescriptionEntity } from '../prescription.entity';

export class PrescriptionFetchResponseDto {
  @ApiProperty({
    description: 'Prescription collection',
  })
  @IsArray()
  @Type(() => PrescriptionEntity)
  readonly data: ReadonlyArray<PrescriptionEntity>;

  @ApiProperty({
    description: 'Total number of registered prescriptions',
  })
  @IsNumber()
  readonly rows: number;
}
