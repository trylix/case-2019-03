import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as helmet from 'helmet';

import envsConfig from './config/envs.config';
import { AppModule } from './modules';
import { dbSeeds } from './shared/utils';

const port = envsConfig().port;
const isProd = envsConfig().env === 'production';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet());
  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: isProd,
      forbidUnknownValues: true,
    }),
  );

  const APP_VERSION = process.env.npm_package_version;

  const swaggerOptions = new DocumentBuilder()
    .setTitle('Vitta Challenge API')
    .setDescription('API endpoints list')
    .setVersion(APP_VERSION)
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'access-token',
    )
    .build();

  const document = SwaggerModule.createDocument(app, swaggerOptions);

  SwaggerModule.setup('/swagger', app, document);

  await dbSeeds();

  await app.listen(port, '0.0.0.0', async () => {
    Logger.log(
      `Listening on port ${port} on ${await app.getUrl()} as ${
        envsConfig().env
      }`,
    );
  });

  process.on('unhandledRejection', (reason, promise) => {
    console.error(reason);
    console.log(promise);
  });

  process.on('uncaughtException', err => {
    console.error(err);
  });

  process.on('SIGTERM', async () => {
    await app.close();
    process.exit(0);
  });
}

bootstrap().catch(err => console.error(err));
