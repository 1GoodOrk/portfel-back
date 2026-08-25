import {
  Get,
  Post,
  Body,
  Put,
  Delete,
  Param,
  Query,
  Controller,
  UsePipes,
} from '@nestjs/common';
import { EnterpriseLogService } from './project.service';
// import { PortfolioRO } from './portfolio.interface';
import { CreateDto, UpdateDto } from './dto';
// import { Project } from './project.decorator';
import { ValidationPipe } from '../../../shared/pipes/validation.pipe';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('EnterpriseLog')
@Controller()
export class EnterpriseLogController {
  constructor(private readonly projectService: EnterpriseLogService) {}

  @Get('enterprise-log/:id')
  async findOne(@Param() params): Promise<any> {
    return await this.projectService.findById(params.id);
  }

  @Get('enterprise-log')
  async findAll(@Query() query): Promise<any> {
    return await this.projectService.findAll(query.token);
  }

  // @UsePipes(new ValidationPipe())
  @Post('enterprise-log')
  async create(
    @Body('data') data: CreateDto,
    @Query() query
  ): Promise<any> {
    return this.projectService.create(data, query.token);
  }

  @Put('enterprise-log/:id')
  async update(
    @Param() params,
    @Body('data') data: UpdateDto,
  ): Promise<any> {
    return await this.projectService.update(params.id, data);
  }

  @Delete('enterprise-log/:id')
  async delete(@Param() params, @Query() query): Promise<any> {
    return await this.projectService.delete(params.id, query.token);
  }

  @Get('enterprise-parsing')
  async parsing(@Query() params): Promise<any> {
    return await this.projectService.parsing(params.search);
  }
}
