import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const port = configService.get<number>('PORT');

  app.useGlobalPipes(new ValidationPipe());

  if (configService.get<string>('ENABLE_SWAGGER_API') === 'true') {
    const document = SwaggerModule.createDocument(
      app,
      new DocumentBuilder()
        .addBearerAuth()
        .setTitle('ISD Hackathon')
        .setDescription('ISD Hackathon Backend API Description')
        .setVersion('1.0')
        .build(),
    );
    SwaggerModule.setup('api', app, document);
  }

  if (configService.get<string>('ALLOW_CROSS_ORIGIN') === 'true') {
    app.enableCors();
  }

  await app.listen(port);
}
bootstrap();
