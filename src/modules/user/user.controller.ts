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
  Req,
} from '@nestjs/common';
import type { Request } from 'express';
import { UserService } from './user.service';
import { UserRO } from './user.interface';
import { CreateDto, UpdateDto, LoginDto } from './dto';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
// import { User } from './user.decorator';
import { ValidationPipe } from '../../shared/pipes/validation.pipe';

import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('User')
@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('users/:id')
  async findMe(@Param() params): Promise<UserRO> {
    return await this.userService.findById(params.id);
  }

  @Get('users')
  async findAll(@Query() query): Promise<Array<any>> {
    return await this.userService.findAll(query.filter);
  }

  @Put('users')
  async update(
    // @User('_id') _id: string,
    @Body('data') data: UpdateDto,
  ): Promise<UserRO> {
    console.log(1231)
    return await this.userService.update(data);
  }

  // @UsePipes(new ValidationPipe())
  @Post('users')
  async create(@Body('data') data: CreateDto): Promise<UserRO> {
    return this.userService.create(data);
  }

  @Delete('users/:id')
  async delete(@Param() params): Promise<any> {
    return await this.userService.delete(params.id);
  }

  // @UsePipes(new ValidationPipe())
  @Get('login')
  async login(@Req() req: Request): Promise<any> {
    if (!req.body) {
      const errors = { message: 'NOT_FOUND' };
      throw new HttpException({ errors }, 401);
    }
    const { id, email, password, portfolioIds, projectIds, type } = req.body;
    return this.userService.findByEmail(email);
    // const data = { 
    //   id, 
    //   email, 
    //   password,
    //   type,
    //   token: await this.userService.generateJWT(req.body), 
    //   portfolioIds, 
    //   projectIds 
    // };
    // return { data };
  }
}
