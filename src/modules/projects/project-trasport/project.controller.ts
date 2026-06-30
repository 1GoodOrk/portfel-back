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
import { ProjectTransportService } from './project.service';
// import { PortfolioRO } from './portfolio.interface';
import { CreateDto, UpdateDto } from './dto';
// import { Project } from './project.decorator';
import { ValidationPipe } from '../../../shared/pipes/validation.pipe';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('ProjectTransport')
@Controller()
export class ProjectTransportController {
  constructor(private readonly projectService: ProjectTransportService) {}

  @Get('projects-transport/:id')
  async findOne(@Param() params): Promise<any> {
    return await this.projectService.findById(params.id);
  }

  @Get('projects-transport')
  async findAll(@Query() query): Promise<any> {
    return await this.projectService.findAll(query.token);
  }

  // @UsePipes(new ValidationPipe())
  @Post('projects-transport')
  async create(
    @Body('data') data: CreateDto,
    @Query() query
  ): Promise<any> {
    return this.projectService.create(data, query.token);
  }

  @Put('projects-transport/:id')
  async update(
    @Param() params,
    @Body('data') data: UpdateDto,
  ): Promise<any> {
    return await this.projectService.update(params.id, data);
  }

  @Delete('projects-transport/:id')
  async delete(@Param() params, @Query() query): Promise<any> {
    return await this.projectService.delete(params.id, query.token);
  }
}
