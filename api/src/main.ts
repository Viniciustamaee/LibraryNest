import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe())
  app.enableCors({
    origin: 'http://localhost:8000',
    credentials: true
  })
  dotenv.config();
  await app.listen(process.env.MAIN_PORT);
}
bootstrap();
