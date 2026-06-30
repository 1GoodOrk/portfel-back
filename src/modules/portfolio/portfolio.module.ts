import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { PortfolioController } from './portfolio.controller';
// import { TypeOrmModule } from '@nestjs/typeorm';
import { PortfolioEntity } from './portfolio.entity';
import { PortfolioService } from './portfolio.service';

import { LoggerMiddleware } from '@port/middleware/logger.middleware';

import { ProjectService } from '../project/project.service';
// import { ProjectEntity } from '../project/project.entity';
import { UserService } from '../user/user.service';
// import { UserEntity } from '../user/user.entity';

@Module({
  // imports: [TypeOrmModule.forFeature([PortfolioEntity, UserEntity, ProjectEntity])],
  imports: [],
  providers: [PortfolioService, ProjectService, UserService],
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