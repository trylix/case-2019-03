import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { UserRole } from 'src/modules/user/user.entity';

export class UserUpdateDto {
  @ApiProperty({
    description: 'User name',
    required: false,
  })
  @IsString()
  @IsOptional()
  readonly name?: string;

  @ApiProperty({
    description: 'User email',
    required: false,
  })
  @IsString()
  @IsOptional()
  readonly email?: string;

  @ApiProperty({
    description: 'User password',
    required: false,
  })
  @IsString()
  @IsOptional()
  readonly password?: string;

  @ApiProperty({
    description: 'User role',
    enum: UserRole,
    required: false,
  })
  @IsEnum(UserRole)
  @IsOptional()
  readonly role?: UserRole;
}
