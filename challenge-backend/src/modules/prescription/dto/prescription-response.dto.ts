import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsOptional } from 'class-validator';
import { MedicationInteractionEntity } from 'src/modules/medication/entities/medication-interaction.entity';

import { PrescriptionEntity } from '../prescription.entity';

export class PrescriptionResponseDto {
  @ApiProperty({
    description: 'Prescription',
    required: false,
  })
  @IsArray()
  @IsOptional()
  readonly prescription?: Readonly<PrescriptionEntity>;

  @ApiProperty({
    description: 'Medication interactions',
    required: false,
  })
  @IsArray()
  @IsOptional()
  readonly possibleInteractions?: ReadonlyArray<MedicationInteractionEntity>;
}
