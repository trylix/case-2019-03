import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';
import { UserRole } from 'src/modules/user/user.entity';

export class UserResponseDto {
  @ApiProperty({
    description: 'User ID',
  })
  @IsUUID()
  @IsNotEmpty()
  readonly id: string;

  @ApiProperty({
    description: 'User name',
  })
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({
    description: 'User email',
  })
  @IsString()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({
    description: 'User role',
    enum: UserRole,
  })
  @IsEnum(UserRole)
  @IsNotEmpty()
  readonly role: UserRole;

  @ApiProperty({
    description: 'User created date in unix time',
  })
  @IsNumber()
  @IsNotEmpty()
  readonly createdAt: number;

  @ApiProperty({
    description: 'Last user updated date in unix time',
  })
  @IsNumber()
  @IsNotEmpty()
  readonly updatedAt: number;
}
