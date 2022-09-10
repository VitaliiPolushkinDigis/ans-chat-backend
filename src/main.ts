import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());

  const { PORT } = process.env;

  await app.listen(PORT, () =>
    console.log(`-------App is running on http://localhost:${PORT}`),
  );
}
bootstrap();
