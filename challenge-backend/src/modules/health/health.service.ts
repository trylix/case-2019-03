import { Injectable } from '@nestjs/common';
import envsConfig from 'src/config/envs.config';

import { HealthDto } from './dto/health.dto';

@Injectable()
export class HealthService {
  getHealth(): HealthDto {
    return {
      status: 'online',
      environment: envsConfig().env,
    };
  }
}
