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
import { ProjectScienceService } from './project.service';
// import { PortfolioRO } from './portfolio.interface';
import { CreateDto, UpdateDto } from './dto';
// import { Project } from './project.decorator';
import { ValidationPipe } from '../../shared/pipes/validation.pipe';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('ProjectScience')
@Controller()
export class ProjectScienceController {
  constructor(private readonly projectService: ProjectScienceService) {}

  @Get('projects-science/:id')
  async findOne(@Param() params): Promise<any> {
    return await this.projectService.findById(params.id);
  }

  @Get('projects-science')
  async findAll(@Query() query): Promise<any> {
    return await this.projectService.findAll(query.token);
  }

  // @UsePipes(new ValidationPipe())
  @Post('projects-science')
  async create(
    @Body('data') data: CreateDto,
    @Query() query
  ): Promise<any> {
    return this.projectService.create(data, query.token);
  }

  @Put('projects-science/:id')
  async update(
    @Param() params,
    @Body('data') data: UpdateDto,
  ): Promise<any> {
    return await this.projectService.update(params.id, data);
  }

  @Delete('projects-science/:id')
  async delete(@Param() params, @Query() query): Promise<any> {
    return await this.projectService.delete(params.id, query.token);
  }
}
