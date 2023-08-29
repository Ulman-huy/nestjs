import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  // Add middleware
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000, () => console.log('Server is re-started...!'));
}
bootstrap();
