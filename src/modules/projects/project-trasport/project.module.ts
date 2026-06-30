import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ProjectTransportController } from './project.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectTransportEntity } from './project.entity';
import { ProjectTransportService } from './project.service';

import { LoggerMiddleware } from '@port/middleware/logger.middleware';

import { UserService } from '../../user/user.service';
import { UserEntity } from '../../user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectTransportEntity, UserEntity])],
  providers: [ProjectTransportService, UserService],
  controllers: [
    ProjectTransportController
  ],
  exports: [ProjectTransportService]
})
export class ProjectTransportModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes(ProjectTransportController)
  }
}