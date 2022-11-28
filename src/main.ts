import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import * as morgan from 'morgan';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './modules/app/app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { urlencoded, json } from 'express';
import { PrismaService } from './modules/util/services/prisma.service';
import { useContainer } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  app.use(json({ limit: '50mb' }));

  app.use(urlencoded({ limit: '50mb', extended: true }));

  app.use(
    helmet({
      contentSecurityPolicy: false,
    })
  );

  app.use(morgan('dev'));

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  app.setGlobalPrefix('api/v1/');

  const swaggerDocumentOptions = new DocumentBuilder()
  .setTitle('Authy API Documentation')
  .setDescription('Authy API Documentation')
  .setVersion('1.0')
  .addBearerAuth()
  .build();

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerDocumentOptions);

  SwaggerModule.setup('docs', app, swaggerDocument);

  const prismaService = app.get(PrismaService);
  
  await prismaService.enableShutdownHooks(app)

  const port = process.env.PORT || 3000;

  await app.listen(port);
  
  return port;

}

bootstrap().then((port) =>
  console.log(`App successfully started on port ${port} !`),
);

