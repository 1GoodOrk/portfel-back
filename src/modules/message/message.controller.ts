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
import { MessageService } from './message.service';
import { CreateDto, UpdateDto } from './dto';
import { ValidationPipe } from '../../shared/pipes/validation.pipe';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Message')
@Controller()
export class MessageController {
  constructor(private readonly service: MessageService) {}

  @Get('messages/:id')
  async findOne(@Param() params): Promise<any> {
    return await this.service.findById(params.id);
  }

  @Get('messages')
  async findAll(): Promise<any> {
    return await this.service.findAll();
  }

  // @UsePipes(new ValidationPipe())
  @Post('messages')
  async create(@Body('data') data: CreateDto): Promise<any> {
    return this.service.create(data);
  }

  @Put('messages/:id')
  async update(
    @Param() params,
    @Body('data') data: UpdateDto,
  ): Promise<any> {
    return await this.service.update(params.id, data);
  }

  @Delete('messages/:id')
  async delete(@Param() params): Promise<any> {
    return await this.service.delete(params.id);
  }
}
