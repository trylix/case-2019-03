import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { UserRole } from 'src/modules/user/user.entity';

export class UserRegisterDto {
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
    description: 'User password',
  })
  @IsString()
  @IsNotEmpty()
  readonly password: string;

  @ApiProperty({
    description: 'User role',
    enum: UserRole,
    default: UserRole.PATIENT,
    required: false,
  })
  @IsEnum(UserRole)
  @IsOptional()
  readonly role?: UserRole = UserRole.PATIENT;
}
