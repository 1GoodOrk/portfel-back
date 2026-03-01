import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ExpertiseController } from './expertise.controller';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { ExpertiseEntity } from './expertise.entity';
import { ExpertiseService } from './expertise.service';

import { LoggerMiddleware } from '../../middleware/logger.middleware';
import { UserService } from '../user/user.service';
// import { UserEntity } from '../user/user.entity';
import { ProjectScienceService } from '../project-science/project.service';
// import { ProjectScienceEntity } from '../project-science/project.entity';

@Module({
  // imports: [TypeOrmModule.forFeature([ExpertiseEntity, UserEntity, ProjectScienceEntity])],
  imports: [],
  providers: [ExpertiseService, ProjectScienceService, UserService],
  controllers: [
    ExpertiseController
  ],
  exports: [ExpertiseService]
})
export class ExpertiseModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes(ExpertiseController)
  }
}