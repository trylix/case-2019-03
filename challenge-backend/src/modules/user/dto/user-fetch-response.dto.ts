import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNumber } from 'class-validator';

import { UserResponseDto } from './user-response.dto';

export class UserFetchResponseDto {
  @ApiProperty({
    description: 'User collection',
  })
  @IsArray()
  @Type(() => UserResponseDto)
  readonly data: ReadonlyArray<UserResponseDto>;

  @ApiProperty({
    description: 'Total number of registered users',
  })
  @IsNumber()
  readonly rows: number;
}
