import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ProjectScienceController } from './project.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectScienceEntity } from './project.entity';
import { ProjectScienceService } from './project.service';

import { LoggerMiddleware } from '@port/middleware/logger.middleware';

import { UserService } from '../user/user.service';
import { UserEntity } from '../user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectScienceEntity, UserEntity])],
  providers: [ProjectScienceService, UserService],
  controllers: [
    ProjectScienceController
  ],
  exports: [ProjectScienceService]
})
export class ProjectScienceModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes(ProjectScienceController)
  }
}