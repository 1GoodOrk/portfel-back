import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository, DeleteResult } from 'typeorm';
import { PortfolioEntity } from './portfolio.entity';
import { CreateDto, UpdateDto } from './dto';
const jwt = require('jsonwebtoken');
import { SECRET } from '../../config';
import { PortfolioRO, PortfolioDataRO } from './portfolio.interface';
import { validate } from 'class-validator';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { HttpStatus } from '@nestjs/common';
import * as argon2 from 'argon2';

@Injectable()
export class PortfolioService {
  constructor(
    @InjectRepository(PortfolioEntity)
    private readonly repository: Repository<PortfolioEntity>,
  ) {}

  // Promise<Array<UserEntity>>
  async findAll(): Promise<any> {
    return await this.repository.find();
  }

  async create(dto: CreateDto): Promise<any> {
    // check uniqueness of username/email
    // const { username, email, password } = dto;
    // const qb = await getRepository(UserEntity)
    //   .createQueryBuilder('user')
    //   .where('user.username = :username', { username })
    //   .orWhere('user.email = :email', { email });

    // const user = await qb.getOne();

    // if (user) {
    //   const errors = { username: 'Username and email must be unique.' };
    //   throw new HttpException(
    //     { message: 'Input data validation failed', errors },
    //     HttpStatus.BAD_REQUEST,
    //   );
    // }

    // // create new user
    // const newUser = new UserEntity();
    // newUser.username = username;
    // newUser.email = email;
    // newUser.password = password;
    // newUser.articles = [];

    // const errors = await validate(newUser);
    // if (errors.length > 0) {
    //   const _errors = { username: 'Userinput is not valid.' };
    //   throw new HttpException(
    //     { message: 'Input data validation failed', _errors },
    //     HttpStatus.BAD_REQUEST,
    //   );
    // } else {
    //   const savedUser = await this.userRepository.save(newUser);
    //   return this.buildUserRO(savedUser);
    // }
  }

  async update(id: any, dto: UpdateDto): Promise<any> {
    const entity = await this.repository.findOne(id);
    if (entity) {
      Object.keys(dto).forEach((key: string) => {
        entity[key] = dto[key]
      })
      return await this.repository.save(Object.assign(entity, dto));
    }
    return null
  }

  async delete(id: string): Promise<DeleteResult> {
    return await this.repository.delete(id);
  }

  async findById(id: any): Promise<any> {
    const data = await this.repository.findOne(id);

    if (!data) {
      const errors = { Data: ' not found' };
      throw new HttpException({ errors }, 401);
    }

    return this.buildDataRO(data);
  }

  private buildDataRO(entity: PortfolioEntity): any {
    const data = {
      id: entity.id,
      name: entity.name,
      img: entity.img,
      des: entity.des,
      projects: entity.projects,
      projectIds: entity.projectIds,
      subinfo: entity.subinfo,
      budget: entity.budget,
      duration: entity.duration,
      location: entity.location,
      town: entity.town,
      options: {
        eco: entity.optionEco,
        war: entity.optionWar,
        log: entity.optionLog,
        doc: entity.optionDoc,
        struc: entity.optionStruc,
      }
    };

    return { data };
  }
}
