import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

const logger = new Logger('📦 API BoxFul');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const apiPrefix = configService.get<string>('apiPrefix');
  const port = configService.get<number>('port');

  if (apiPrefix) {
    app.setGlobalPrefix(apiPrefix);
    logger.debug(`🌍 | Global prefix set to: ${apiPrefix}`);
  }
  await app.listen(port || 3000);
  logger.debug(`👂 | Listening port ${port} for HTTP traffic`);
  logger.debug(`🦽 | Application is running on: ${await app.getUrl()}`);
}
bootstrap();
