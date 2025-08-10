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
import { ProjectService } from './project.service';
// import { PortfolioRO } from './portfolio.interface';
import { CreateDto, UpdateDto } from './dto';
// import { Project } from './project.decorator';
import { ValidationPipe } from '../../shared/pipes/validation.pipe';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('project')
@Controller()
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get('projects/:id')
  async findOne(@Param() params): Promise<any> {
    return await this.projectService.findById(params.id);
  }

  @Get('projects')
  async findAll(): Promise<any> {
    return await this.projectService.findAll();
  }

  // @UsePipes(new ValidationPipe())
  @Post('projects')
  async create(@Body('data') data: CreateDto): Promise<any> {
    return this.projectService.create(data);
  }

  @Put('projects/:id')
  async update(
    @Param() params,
    @Body('data') data: UpdateDto,
  ): Promise<any> {
    return await this.projectService.update(params.id, data);
  }

  @Delete('projects/:id')
  async delete(@Param() params): Promise<any> {
    return await this.projectService.delete(params.id);
  }
}
