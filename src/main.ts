import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
// import * as ngrok from '@ngrok/ngrok';

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

  // (async () => {
  //   const listener = await ngrok.forward({
  //     addr: 27182,
  //     authtoken: '3AJkJKjVnsjkwASZCj6D1O1Qnya_7ZuQxqNzTT1aNYyJWteLG'
  //     // authtoken_from_env: true // Uses the NGROK_AUTHTOKEN env variable
  //   });
  //   console.log(`NestJS server exposed at: ${listener.url()}`);
  // })();

  const logger = new WinstonLogger(); 
  const appUrl = await app.getUrl();
  logger.info(`Start. Application is running on: ${appUrl}`);
}
bootstrap();
