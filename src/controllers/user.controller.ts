import { Controller, Get, Post, Put, Delete, Param } from '@nestjs/common';
import { Request } from 'express';

@Controller('users')
export class UserController {
  // @Get('user')
  // async findMe(@User('email') email: string): Promise<UserRO> {
  //   return await this.userService.findByEmail(email);
  // }
  @Get()
  findAll(): string {
    // @Req() request: Request
    // console.log(request)
    return 'This action returns all cats';
  }

  @Get(':id')
  findOne(@Param() params: { id: string }): string {
    console.log(params.id);
    return 'This action returns all cats';
  }

  @Post()
  create(): string {
    return 'This action adds a new cat';
  }

  @Put()
  update(): string {
    return 'This action adds a new cat';
  }

  @Delete()
  delete(): string {
    return 'This action adds a new cat';
  }
}
