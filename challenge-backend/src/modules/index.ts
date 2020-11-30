import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as PostgressConnectionStringParser from 'pg-connection-string';
import envsConfig from 'src/config/envs.config';
import { HttpExceptionFilter } from 'src/filters/http-exception.filter';
import { HealthModule } from 'src/modules/health/health.module';

const connectionOptions = PostgressConnectionStringParser.parse(
  envsConfig().database.url,
);

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: connectionOptions.host,
      username: connectionOptions.user,
      password: connectionOptions.password,
      database: connectionOptions.database,
      port: Number(connectionOptions.port),
      synchronize: envsConfig().database.synchronize,
    }),
    HealthModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
