import { Body, Controller, Get, HttpCode, Post, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse
} from '@nestjs/swagger';
import { HttpLoggingInterceptor } from 'src/interceptors/http-logging.interceptor';

import { UserResponseDto } from '../user/dto/user-response.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { TokenDto } from './dto/token.dto';

@UseInterceptors(HttpLoggingInterceptor)
@Controller('auth')
@ApiTags('Auth')
@ApiInternalServerErrorResponse({
  description: 'Internal server error',
})
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @ApiCreatedResponse({
    description: 'Returns information for the created session',
    type: TokenDto,
  })
  @ApiUnauthorizedResponse({ description: 'Invalid password' })
  @ApiNotFoundResponse({
    description: 'No users with this email were found',
  })
  @HttpCode(201)
  async login(@Body() loginDto: LoginDto): Promise<TokenDto> {
    return this.authService.login(loginDto);
  }

  @Get('/logged')
  @ApiOkResponse({
    description: 'Returns user information by token',
    type: TokenDto,
  })
  @ApiUnauthorizedResponse({ description: 'Invalid token' })
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('jwt'))
  logged(@Req() req: Express.Request): UserResponseDto {
    return req.user as UserResponseDto;
  }
}
