import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty } from 'class-validator';

export class CheckInteractionDto {
  @ApiProperty({
    description: 'Medications list',
  })
  @IsArray()
  @IsNotEmpty()
  readonly medications: string[];
}
