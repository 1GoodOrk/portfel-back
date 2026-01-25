import {
  Get,
  Post,
  Body,
  Put,
  Delete,
  Param,
  Controller,
  UsePipes,
  Query,
} from '@nestjs/common';
import { ExpertiseService } from './expertise.service';
import { CreateDto, UpdateDto } from './dto';
import { ValidationPipe } from '../../shared/pipes/validation.pipe';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Expertise')
@Controller()
export class ExpertiseController {
  constructor(private readonly service: ExpertiseService) {}

  @Get('expertise/:id')
  async findOne(@Param() params): Promise<any> {
    return await this.service.findById(params.id);
  }

  @Get('expertise')
  async findAll(@Query() query): Promise<any> {
    return await this.service.findAll(query.project);
  }

  @Post('expertise')
  async create(@Body('data') data: CreateDto, @Query() query): Promise<any> {
    return this.service.create(data, query.project);
  }

  @Put('expertise')
  async update(@Body('data') data: UpdateDto): Promise<any> {
    return this.service.update(data);
  }

  @Delete('expertise/:id')
  async delete(@Param() params, @Query() query): Promise<any> {
    return await this.service.delete(params.id, query.project);
  }
}
