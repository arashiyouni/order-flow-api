import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const logger = new Logger('📦 API BoxFul');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const docUrl = 'api-docs';
  const configService = app.get(ConfigService);

  const apiPrefix = configService.get<string>('apiPrefix');
  const port = configService.get<number>('port');

  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  )

  const config = new DocumentBuilder()
    .setTitle('API Nest')
    .setDescription('🎈 Prueba técnica de BoxFul')
    .setVersion('1.0')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'jwt',
      in: 'header',
    })

    .addTag('auth')
    .addTag('user')
    .addTag('order')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(docUrl, app, document);
  logger.debug(`📄 | documentation: /${docUrl}`)

  if (apiPrefix) {
    app.setGlobalPrefix(apiPrefix);
    logger.debug(`🌍 | Global prefix set to: ${apiPrefix}`);
  }
  await app.listen(port || 3000);
  logger.debug(`👂 | Listening port ${port} for HTTP traffic`);
  logger.debug(`🦽 | Application is running on: ${await app.getUrl()}`);
}
bootstrap();
