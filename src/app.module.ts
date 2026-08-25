import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from './modules/user/user.module';
// import { PortfolioModule } from './modules/portfolio/portfolio.module';
// import { ProjectModule } from './modules/project/project.module';
// import { ProjectVehicleModule } from './modules/project-vehicle/project.module';
// import { ProjectScienceModule } from './modules/project-science/project.module';
// import { ProjectLogisticModule } from './modules/project-logistic/project.module';
// import { ProjectTransportModule } from './modules/projects/project-trasport/project.module';
// import { ProjectAutoModule } from './modules/projects/project-auto/project.module'; // oliynik
import { EnterpriseLogModule } from './modules/projects/enterprise-log-control/project.module';
import { MessageModule } from './modules/message/message.module';
import { MONGO_DB, MONGO_DB_NAME } from '@port/config';
// import { ExpertiseModule } from './modules/expertise/expertise.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: MONGO_DB,
      database: MONGO_DB_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    UserModule,
    EnterpriseLogModule,
    MessageModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
