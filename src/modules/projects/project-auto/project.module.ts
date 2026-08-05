import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ProjectAutoController } from './project.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectAutoEntity } from './project.entity';
import { ProjectAutoService } from './project.service';

import { LoggerMiddleware } from '@port/middleware/logger.middleware';

import { UserService } from '../../user/user.service';
import { UserEntity } from '../../user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectAutoEntity, UserEntity])],
  providers: [ProjectAutoService, UserService],
  controllers: [
    ProjectAutoController
  ],
  exports: [ProjectAutoService]
})
export class ProjectAutoModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes(ProjectAutoController)
  }
}