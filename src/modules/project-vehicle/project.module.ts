import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ProjectVehicleController } from './project.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectVehicleEntity } from './project.entity';
import { ProjectVehicleService } from './project.service';

import { LoggerMiddleware } from '@port/middleware/logger.middleware';

import { UserService } from '../user/user.service';
import { UserEntity } from '../user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectVehicleEntity, UserEntity])],
  providers: [ProjectVehicleService, UserService],
  controllers: [
    ProjectVehicleController
  ],
  exports: [ProjectVehicleService]
})
export class ProjectVehicleModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes(ProjectVehicleController)
  }
}