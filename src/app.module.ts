import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserModule } from './modules/user/user.module';
import { PortfolioModule } from './modules/portfolio/portfolio.module';
import { ProjectModule } from './modules/project/project.module';
import { ProjectVehicleModule } from './modules/project-vehicle/project.module';
import { ProjectScienceModule } from './modules/project-science/project.module';
import { MessageModule } from './modules/message/message.module';
// import { MONGO_DB, MONGO_DB_NAME } from './config';
import { ExpertiseModule } from './modules/expertise/expertise.module';

@Module({
  imports: [
    // TypeOrmModule.forRoot({
    //   type: 'mongodb',
    //   url: MONGO_DB,
    //   database: MONGO_DB_NAME,
    //   entities: [__dirname + '/**/*.entity{.ts,.js}'],
    //   synchronize: true,
    // }),
    UserModule,
    PortfolioModule,
    ProjectModule,
    ProjectVehicleModule,
    ProjectScienceModule,
    ExpertiseModule,
    MessageModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
