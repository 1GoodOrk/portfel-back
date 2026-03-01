import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { UserController } from './user.controller';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { UserEntity } from './user.entity';
import { UserService } from './user.service';
import { AuthMiddleware } from './auth.middleware';

import { LoggerMiddleware } from '@port/middleware/logger.middleware';
import { ExpertiseService } from '../expertise/expertise.service';
// import { ExpertiseEntity } from '../expertise/expertise.entity';
// import { ProjectEntity } from '../project/project.entity';
import { ProjectService } from '../project/project.service';
// import { ProjectScienceEntity } from '../project-science/project.entity';
import { ProjectScienceService } from '../project-science/project.service';


@Module({
  // imports: [TypeOrmModule.forFeature([UserEntity, ExpertiseEntity, ProjectEntity, ProjectScienceEntity])],
  imports: [],
  providers: [UserService, ExpertiseService, ProjectService, ProjectScienceService],
  controllers: [
    UserController
  ],
  exports: [UserService]
})
export class UserModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes(UserController)
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: 'login', method: RequestMethod.GET }, 
        // { path: 'user', method: RequestMethod.PUT }
      );
  }
}