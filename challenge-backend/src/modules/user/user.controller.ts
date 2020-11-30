import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse
} from '@nestjs/swagger';
import { HttpLoggingInterceptor } from 'src/interceptors/http-logging.interceptor';

import { UserDeleteDto } from './dto/user-delete.dto';
import { UserFetchResponseDto } from './dto/user-fetch-response.dto';
import { UserFetchDto } from './dto/user-fetch.dto';
import { UserRegisterDto } from './dto/user-register.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { UserUpdateDto } from './dto/user-update.dto';
import { UserService } from './user.service';

@UseInterceptors(HttpLoggingInterceptor)
@Controller('users')
@ApiTags('User')
@ApiInternalServerErrorResponse({
  description: 'Internal server error',
})
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOkResponse({
    description: 'Returns information for all users',
    type: UserResponseDto,
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('jwt'))
  async getUsers(
    @Query() fetchDto?: UserFetchDto,
  ): Promise<UserFetchResponseDto> {
    return this.userService.fetch(fetchDto);
  }

  @Post()
  @ApiCreatedResponse({
    description: 'Returns the information of the registered user',
    type: UserResponseDto,
  })
  @ApiBadRequestResponse({ description: 'Email is already in use' })
  @HttpCode(201)
  async store(@Body() registerDto: UserRegisterDto): Promise<UserResponseDto> {
    return this.userService.store(registerDto);
  }

  @Put(':id')
  @ApiParam({ name: 'id', description: 'User ID', type: 'string' })
  @ApiOkResponse({
    description: 'Returns updated user information',
    type: UserResponseDto,
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBadRequestResponse({
    description: 'Email is already in use',
  })
  @ApiNotFoundResponse({
    description: 'No users with this ID were found',
  })
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('jwt'))
  async update(
    @Param('id') id: string,
    @Body() registerDto: UserUpdateDto,
  ): Promise<UserResponseDto> {
    return this.userService.update(id, registerDto);
  }

  @Get(':id')
  @ApiParam({ name: 'id', description: 'User ID', type: 'string' })
  @ApiOkResponse({
    description: 'User information retrieved by ID',
    type: UserResponseDto,
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'No users with this ID were found' })
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('jwt'))
  async getUserById(@Param('id') id: string): Promise<UserResponseDto> {
    return this.userService.fetchOne({
      id,
    });
  }

  @Delete(':ids')
  @ApiParam({ name: 'ids', description: 'User ID', type: 'string' })
  @ApiOkResponse({
    description: 'User has been deleted',
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiNotFoundResponse({ description: 'No users with this ID were found' })
  @ApiBearerAuth('access-token')
  @UseGuards(AuthGuard('jwt'))
  async delete(@Param('ids') ids: string | string[]): Promise<UserDeleteDto> {
    return this.userService.delete(ids);
  }
}
