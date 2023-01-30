import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      forbidUnknownValues: false,
    }),
  );
  app.use(helmet());
  app.enableCors();
  await app.listen(process.env.PORT || 3000, function () {
    console.log('listening to port', process.env.PORT || 3000);
  });
}
bootstrap();
