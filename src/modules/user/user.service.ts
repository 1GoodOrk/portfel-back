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
  async findAll(): Promise<any> {
    return await this.repository.find();
  }
// Promise<UserEntity> | null
  async findOne({ email, password }: LoginDto): Promise<any> {
    // const user = await this.userRepository.findOne({ email: email });
    // if (!user) {
    //   return null;
    // }

    // if (await argon2.verify(user.password, password)) {
    //   return user;
    // }

    // return null;
  }

  async create(dto: CreateDto): Promise<any> {
    console.log(1)
    // check uniqueness of username/email
    const { organization, email, password } = dto;
    console.log(2, organization, email, password)
    // const qb = await getRepository(UserEntity)
    //   .createQueryBuilder('user')
    //   .orWhere('user.email = :email', { email });
    // console.log(3)

    // const data = await qb.getOne();
    // console.log(4, data)

    // if (data) {
    //   const errors = { email: 'Username and email must be unique.' };
    //   throw new HttpException(
    //     { message: 'Input data validation failed', errors },
    //     HttpStatus.BAD_REQUEST,
    //   );
    // }

    console.log(5)
    const newUser = new UserEntity();
    newUser._id = v6()
    newUser.organization = organization;
    newUser.email = email;
    newUser.password = password;
    newUser.token = this.generateJWT(newUser);
    newUser.projectIds = [];
    newUser.portfolioIds = [];
    console.log(6, newUser)

    const errors = await validate(newUser);
    if (errors.length > 0) {
      console.log(7, errors)
      const _errors = { USER: 'USER_NOT_VALID' };
      throw new HttpException(
        { message: 'Input data validation failed', _errors },
        HttpStatus.BAD_REQUEST,
      );
    } else {
      console.log(8)
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
        id: data.id,
        password: data.password,
        email: data.email,
        exp: exp.getTime() / 1000,
      },
      SECRET,
    );
  }

  private buildDataRO(entity: UserEntity): any {
    const data = {
      id: entity._id,
      email: entity.email,
      password: entity.password,
      token: this.generateJWT(entity),
      organization: entity.organization,
      portfolioIds: entity.portfolioIds,
      projectIds: entity.projectIds,
    };

    return { data };
  }
}
