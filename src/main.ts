import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { WinstonLogger } from '@port/services/winston.logger';

async function bootstrap() {
  const appOptions = { cors: true };
  const app = await NestFactory.create(AppModule, appOptions);
  app.setGlobalPrefix('api');
  const options = new DocumentBuilder()
    .setTitle('Portfolio Server Side')
    .setDescription('Main routes for portfolio system')
    .setVersion('1.1')
    .setBasePath('api')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/docs', app, document);

  await app.listen(27182);

  const logger = new WinstonLogger(); 
  const appUrl = await app.getUrl();
  logger.info(`Start. Application is running on: ${appUrl}`);
}
bootstrap();
