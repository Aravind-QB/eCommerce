import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      forbidUnknownValues: false,
    }),
  );
  app.use(helmet());
  // app.enableCors({origin:["http://localhost:3000", "https://emart-marketplace.web.app", "http://emart-marketplace.web.app/"], credentials:true});
  app.use(cookieParser());
  await app.listen(process.env.PORT || 3000, function () {
    console.log('listening to port', process.env.PORT || 3000);
  });
}
bootstrap();
