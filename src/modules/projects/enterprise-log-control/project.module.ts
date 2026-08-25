import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { EnterpriseLogController } from './project.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnterpriseLogEntity } from './project.entity';
import { EnterpriseLogService } from './project.service';

import { LoggerMiddleware } from '@port/middleware/logger.middleware';

import { UserService } from '../../user/user.service';
import { UserEntity } from '../../user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EnterpriseLogEntity, UserEntity])],
  providers: [EnterpriseLogService, UserService],
  controllers: [
    EnterpriseLogController
  ],
  exports: [EnterpriseLogService]
})
export class EnterpriseLogModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes(EnterpriseLogController)
  }
}