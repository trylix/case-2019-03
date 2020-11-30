import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

export class UserDeleteDto {
  @ApiProperty({
    description: 'User is deleted',
  })
  @IsBoolean()
  readonly deleted: boolean;
}
