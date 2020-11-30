import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class RegisterPrescriptionDto {
  @ApiProperty({
    description: 'Prescription medications',
  })
  @IsArray()
  @IsNotEmpty()
  readonly medications: string[];

  @ApiProperty({
    description: 'Pacient ID',
  })
  @IsString()
  @IsNotEmpty()
  readonly pacient: string;

  @ApiProperty({
    description: 'Doctor ID',
  })
  @IsString()
  @IsNotEmpty()
  readonly doctor: string;
}
