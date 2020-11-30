import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { ApiInternalServerErrorResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { HttpLoggingInterceptor } from 'src/interceptors/http-logging.interceptor';

import { HealthDto } from './dto/health.dto';
import { HealthService } from './health.service';

@UseInterceptors(HttpLoggingInterceptor)
@Controller('health')
@ApiTags('Health')
@ApiInternalServerErrorResponse({
  description: 'Internal server error',
})
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get()
  @ApiOkResponse({
    description: 'Current service status',
  })
  getHealth(): HealthDto {
    return this.healthService.getHealth();
  }
}
