import {
  Get,
  Post,
  Body,
  Put,
  Delete,
  Param,
  Controller,
  UsePipes,
} from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
// import { PortfolioRO } from './portfolio.interface';
import { CreateDto, UpdateDto } from './dto';
// import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { Portfolio } from './portfolio.decorator';
import { ValidationPipe } from '../../shared/pipes/validation.pipe';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('portfolio')
@Controller()
export class UserController {
  constructor(private readonly portfolioService: PortfolioService) {}

  @Get('portfolio')
  async findMe(@Portfolio('id') id: string): Promise<any> {
    return await this.portfolioService.findById(id);
  }

  @Get('portfolios')
  async findAll(): Promise<any> {
    return await this.portfolioService.findAll();
  }
  // Promise<UserRO>
  @Put('portfolio')
  async update(
    @Portfolio('id') id: number,
    @Body('portfolio') data: UpdateDto,
  ): Promise<any> {
    return await this.portfolioService.update(id, data);
  }

  @UsePipes(new ValidationPipe())
  @Post('portfolios')
  async create(@Body('portfolio') data: CreateDto): Promise<any> {
    return this.portfolioService.create(data);
  }

  @Delete('portfolios/:slug')
  async delete(@Param() params): Promise<any> {
    return await this.portfolioService.delete(params.slug);
  }
}
