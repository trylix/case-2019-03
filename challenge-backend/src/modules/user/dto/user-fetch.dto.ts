import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';

import { UserOrderBy, UserResultOrder } from '../user.entity';

export class UserFetchDto {
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
    description: 'User name',
    required: false,
  })
  @IsString()
  @IsOptional()
  readonly name?: string;

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
    description: 'Sorting keyword',
    enum: UserResultOrder,
    default: UserResultOrder.CREATED_AT,
    required: false,
  })
  @IsEnum(UserResultOrder)
  @IsOptional()
  readonly orderKeyword?: UserResultOrder = UserResultOrder.CREATED_AT;

  @ApiProperty({
    description: 'Results order',
    enum: UserOrderBy,
    default: UserOrderBy.DESC,
    required: false,
  })
  @IsEnum(UserOrderBy)
  @IsOptional()
  readonly orderBy?: UserOrderBy = UserOrderBy.DESC;
}
