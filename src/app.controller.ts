import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('hello')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('breed')
  findAll(): string {
    return 'This action returns all cats';
  }

  @Get('/')
  getHello(): string {
    return this.appService.getHello();
  }
}
