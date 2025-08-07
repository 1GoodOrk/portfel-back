import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/users', {
      connectionName: 'users',
    }),
    MongooseModule.forRoot('mongodb://localhost/portfolios', {
      connectionName: 'portfolios',
    }),
    MongooseModule.forRoot('mongodb://localhost/projects', {
      connectionName: 'projects',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
