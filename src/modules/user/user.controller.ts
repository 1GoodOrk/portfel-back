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
// import { Request } from 'express';
import { UserService } from './user.service';
import { UserRO } from './user.interface';
import { CreateDto, UpdateDto, LoginDto } from './dto';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { User } from './user.decorator';
import { ValidationPipe } from '../../shared/pipes/validation.pipe';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('user')
@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('users/:id')
  async findMe(@Param() params): Promise<any> {
    return await this.userService.findById(params.id);
  }

  @Get('user/email')
  async loginEmail(@User('email') email: string): Promise<any> {
    return await this.userService.findByEmail(email);
  }

  @Get('users')
  async findAll(): Promise<any> {
    return await this.userService.findAll();
  }
  // Promise<UserRO>
  @Put('users')
  async update(
    // @User('_id') _id: string,
    @Body('data') data: UpdateDto,
  ): Promise<any> {
    return await this.userService.update(data);
  }

  // @UsePipes(new ValidationPipe())
  @Post('users')
  async create(@Body('data') data: CreateDto): Promise<any> {
    return this.userService.create(data);
  }

  @Delete('users/:id')
  async delete(@Param() params): Promise<any> {
    return await this.userService.delete(params.id);
  }

  @UsePipes(new ValidationPipe())
  @Post('users/login')
  async login(@Body('user') loginUserDto: LoginDto): Promise<UserRO> {
    const _data = await this.userService.findOne(loginUserDto);

    if (!_data) {
      const errors = { User: ' not found' };
      throw new HttpException({ errors }, 401);
    }

    const { id, email, portfolioIds, projectIds } = _data;
    const data = { 
      id, 
      email, 
      token: await this.userService.generateJWT(_data), 
      portfolioIds, 
      projectIds 
    };
    return { data };
  }
}
