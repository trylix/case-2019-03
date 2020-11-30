import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class HealthDto {
  @ApiProperty({
    description: 'Current service status',
  })
  @IsString()
  @IsNotEmpty()
  readonly status: string;

  @ApiProperty({
    description: 'Current service environment',
  })
  @IsString()
  @IsNotEmpty()
  readonly environment: string;
}
