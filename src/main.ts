import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as compression from 'compression';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.use(compression()); //gzip

  const options = new DocumentBuilder()
    .setTitle('Farmacias de turno - BFF - SRV001')
    .setDescription('--')
    .setVersion('1.0')
    .setContact("", "", "")
    .addServer("")
    .addTag("Metadata")
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(process.env.APP_PORT || 8080);
}
bootstrap();
