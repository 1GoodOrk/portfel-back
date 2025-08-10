import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository, DeleteResult } from 'typeorm';
import { UserEntity } from './user.entity';
import { CreateDto, LoginDto, UpdateDto } from './dto';
const jwt = require('jsonwebtoken');
import { SECRET } from '../../config';
import { UserRO } from './user.interface';
import { validate } from 'class-validator';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { HttpStatus } from '@nestjs/common';
import * as argon2 from 'argon2';
import { v6 } from 'uuid';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
  ) {}

  // Promise<Array<UserEntity>>
  async findAll(): Promise<Array<any>> {
    return await this.repository
      .find()
      .then(data => data.map((el: UserEntity) => this.buildDataRO(el)));
  }

  private async findByMail(email: string): Promise<UserEntity | null> {
    const user = await this.repository.findOneBy({ email });
    if (!user) {
      return null;
    }
    return user;
  }

  async create(dto: CreateDto): Promise<any> {
    const { organization, email, password } = dto;

    const user = await this.findByMail(email)
    if (user) {
      const errors = { email: 'ALREADY_EXISTS' };
      throw new HttpException(
        { message: 'Input data validation failed', errors },
        HttpStatus.BAD_REQUEST,
      );
    }

    const newUser = new UserEntity();
    newUser._id = v6()
    newUser.organization = organization;
    newUser.email = email;
    newUser.password = password;
    newUser.projectIds = [];
    newUser.portfolioIds = [];

    const errors = await validate(newUser);
    if (errors.length > 0) {
      const _errors = { user: 'USER_DATA_NOT_VALID' };
      throw new HttpException(
        { message: 'Input data validation failed', _errors },
        HttpStatus.BAD_REQUEST,
      );
    } else {
      return this.buildDataRO(await this.repository.save(newUser))
    }
  }

  async update(dto: UpdateDto): Promise<any> {
    const currentData = await this.repository.findOneBy({ _id: dto._id });
    if (currentData) {
      return await this.repository.update({ _id: dto._id }, Object.assign(currentData, dto));
    }
    return null
  }

  async delete(id: string): Promise<DeleteResult> {
    return await this.repository.delete({ _id: id });
  }

  async findById(id: string): Promise<any> {
    const data = await this.repository.findOneBy({ _id: id });

    if (!data) {
      const errors = { error: 'NOT_FOUND' };
      throw new HttpException({ errors }, 401);
    }

    return this.buildDataRO(data);
  }
// Promise<UserRO>
  async findByEmail(email: any): Promise<any> {
    const data = await this.repository.findOne(email);
    if (data) {
      return this.buildDataRO(data);
    }
  }

  public generateJWT(data) {
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    return jwt.sign(
      {
        id: data._id,
        password: data.password,
        email: data.email,
        exp: exp.getTime() / 1000,
      },
      SECRET,
    );
  }

  private buildDataRO(entity: UserEntity): any {
    const data = {
      _id: entity._id,
      email: entity.email,
      password: entity.password,
      token: this.generateJWT(entity),
      organization: entity.organization,
      portfolioIds: entity.portfolioIds,
      projectIds: entity.projectIds,
    };

    return data;
  }
}
