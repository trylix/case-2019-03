import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

export class TokenValidateDto {
  @ApiProperty({
    description: 'User ID',
  })
  @IsUUID()
  @IsNotEmpty()
  readonly id: string;

  @ApiProperty({
    description: 'Token issued at',
  })
  @IsNumber()
  @IsNotEmpty()
  readonly iat: number;

  @ApiProperty({
    description: 'Token expiration',
  })
  @IsNumber()
  @IsNotEmpty()
  readonly exp: number;
}
