import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './modules/user/user.module';
@Module({
  imports: [
    // TypeOrmModule.forRoot('mongodb'),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb://localhost:27017/portfolio', // Replace with your MongoDB connection string
      database: 'portfolio', // Specify the database name
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // Path to your TypeORM entities
      synchronize: true, // Use with caution in production, can lead to data loss
    }),
    // MongooseModule.forRoot('mongodb://localhost/users', {
    //   connectionName: 'users',
    // }),
    // MongooseModule.forRoot('mongodb://localhost/portfolios', {
    //   connectionName: 'portfolios',
    // }),
    // MongooseModule.forRoot('mongodb://localhost/projects', {
    //   connectionName: 'projects',
    // }),
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
