import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ProjectMeliksetovController } from './project.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectMeliksetovEntity } from './project.entity';
import { ProjectMeliksetovService } from './project.service';

import { LoggerMiddleware } from '@port/middleware/logger.middleware';

import { UserService } from '../../user/user.service';
import { UserEntity } from '../../user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectMeliksetovEntity, UserEntity])],
  providers: [ProjectMeliksetovService, UserService],
  controllers: [
    ProjectMeliksetovController
  ],
  exports: [ProjectMeliksetovService]
})
export class ProjectMeliksetovModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes(ProjectMeliksetovController)
  }
}