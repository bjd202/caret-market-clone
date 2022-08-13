import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser'
import path, { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors({
    origin: true,
    credentials: true
  });
  app.use(cookieParser());
  console.log(__dirname);
  console.log(join(__dirname, '..', 'upload'));
  app.useStaticAssets(join(__dirname, '..', 'upload'));
  await app.listen(4000);
}
bootstrap();
