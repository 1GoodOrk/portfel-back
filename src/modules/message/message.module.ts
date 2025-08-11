import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { MessageController } from './message.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageEntity } from './message.entity';
import { MessageService } from './message.service';

import { LoggerMiddleware } from '@port/middleware/logger.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([MessageEntity])],
  providers: [MessageService],
  controllers: [
    MessageController
  ],
  exports: [MessageService]
})
export class MessageModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes(MessageController)
  }
}