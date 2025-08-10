import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { PortfolioController } from './portfolio.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PortfolioEntity } from './portfolio.entity';
import { PortfolioService } from './portfolio.service';

import { LoggerMiddleware } from '@port/middleware/logger.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([PortfolioEntity])],
  providers: [PortfolioService],
  controllers: [
    PortfolioController
  ],
  exports: [PortfolioService]
})
export class PortfolioModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes(PortfolioController)
  }
}