import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ProjectLogisticController } from './project.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectLogisticEntity } from './project.entity';
import { ProjectLogisticService } from './project.service';

import { LoggerMiddleware } from '@port/middleware/logger.middleware';

import { UserService } from '../user/user.service';
import { UserEntity } from '../user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectLogisticEntity, UserEntity])],
  providers: [ProjectLogisticService, UserService],
  controllers: [
    ProjectLogisticController
  ],
  exports: [ProjectLogisticService]
})
export class ProjectLogisticModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes(ProjectLogisticController)
  }
}