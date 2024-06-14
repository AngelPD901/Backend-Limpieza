import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ValidationPipe} from '@nestjs/common'
import {DocumentBuilder,SwaggerModule} from '@nestjs/swagger'
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
    .setTitle('RESTFull API CleanApp')
    .setDescription('Documentacion de la API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/doc', app, document);
  await app.listen(+process.env.PORT);
  console.log(`app listen in PORT: ${process.env.PORT}`);
}
bootstrap();
