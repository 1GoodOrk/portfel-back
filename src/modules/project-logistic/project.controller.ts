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
import { ProjectLogisticService } from './project.service';
// import { PortfolioRO } from './portfolio.interface';
import { CreateDto, UpdateDto } from './dto';
// import { Project } from './project.decorator';
import { ValidationPipe } from '../../shared/pipes/validation.pipe';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('ProjectLogistic')
@Controller()
export class ProjectLogisticController {
  constructor(private readonly projectService: ProjectLogisticService) {}

  @Get('projects-logistic/:id')
  async findOne(@Param() params): Promise<any> {
    return await this.projectService.findById(params.id);
  }

  @Get('projects-logistic')
  async findAll(@Query() query): Promise<any> {
    return await this.projectService.findAll(query.token);
  }

  // @UsePipes(new ValidationPipe())
  @Post('projects-logistic')
  async create(
    @Body('data') data: CreateDto,
    @Query() query
  ): Promise<any> {
    return this.projectService.create(data, query.token);
  }

  @Put('projects-logistic/:id')
  async update(
    @Param() params,
    @Body('data') data: UpdateDto,
  ): Promise<any> {
    return await this.projectService.update(params.id, data);
  }

  @Delete('projects-logistic/:id')
  async delete(@Param() params, @Query() query): Promise<any> {
    return await this.projectService.delete(params.id, query.token);
  }
}
