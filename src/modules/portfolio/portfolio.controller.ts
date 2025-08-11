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
@ApiTags('Portfolio')
@Controller()
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}

  @Get('portfolios/:id')
  async findOne(@Param() params): Promise<any> {
    return await this.portfolioService.findById(params.id);
  }

  @Get('portfolios')
  async findAll(): Promise<any> {
    return await this.portfolioService.findAll();
  }

  // @UsePipes(new ValidationPipe())
  @Post('portfolios')
  async create(@Body('data') data: CreateDto): Promise<any> {
    return this.portfolioService.create(data);
  }

  // @UsePipes(new ValidationPipe())
  @Put('portfolios/:id')
  async update(
    @Param() params,
    @Body('data') data: UpdateDto,
  ): Promise<any> {
    return await this.portfolioService.update(params.id, data);
  }

  @Delete('portfolios/:id')
  async delete(@Param() params): Promise<any> {
    return await this.portfolioService.delete(params.id);
  }
}
