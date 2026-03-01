import { Injectable, StreamableFile} from '@nestjs/common';
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
import * as CryptoJS from 'crypto-js';

import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
  ) {}

  async findAll(filter?: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const data = JSON
        .parse(readFileSync(join(process.cwd(), '/src/data/users.json'), 'utf8'))
        .map((item: any) => this.buildDataRO(item))
      resolve(data)
    })

    // return await this.repository
    //   .find()
    //   .then(data => data
    //     .filter((el: UserEntity) => filter ? el.type === filter : el)
    //     .map((el: UserEntity) => this.buildDataRO(el))
    //   );
  }

  private async findByMail(email: string): Promise<UserEntity | null> {
    return new Promise<any>((resolve, reject) => {
      const data: any = JSON.parse(readFileSync(join(process.cwd(), '/src/data/users.json'), 'utf8'))
      resolve(data.find((el: any) => el.email === email))
    })

    // const user = await this.repository.findOneBy({ email });
    // if (!user) {
    //   return null;
    // }
    // return user;
  }

  async create(dto: CreateDto): Promise<any> {
    const original = JSON.parse(CryptoJS.AES.decrypt(dto, SECRET).toString(CryptoJS.enc.Utf8));
    const user = await this.findByMail(original.email)
    if (user) {
      const errors = { email: 'ALREADY_EXISTS' };
      throw new HttpException(
        { message: 'Input data validation failed', errors },
        HttpStatus.BAD_REQUEST,
      );
    }

    const newUser = new UserEntity();
    newUser._id = v6()
    newUser.organization = original.organization;
    newUser.email = original.email;
    newUser.password = await argon2.hash(original.password);
    newUser.type = original.type ? original.type : 'USER';
    newUser.projectIds = [];
    newUser.portfolioIds = [];

    return new Promise<any>((resolve, reject) => {
      const data: any = JSON.parse(readFileSync(join(process.cwd(), '/src/data/users.json'), 'utf8'))
      data.push(newUser)
      writeFileSync(join(process.cwd(), '/src/data/users.json'), JSON.stringify(data))
      resolve(this.buildDataRO(newUser))
    })
    // return this.buildDataRO(await this.repository.save(newUser))
  }

  async update(dto: UpdateDto): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const data: any = JSON.parse(readFileSync(join(process.cwd(), '/src/data/users.json'), 'utf8'))
      const index = data.findIndex((el: any) => el._id === dto._id)
      if (index > -1) {
        data[index] = Object.assign(data[index], dto)
        writeFileSync(join(process.cwd(), '/src/data/users.json'), JSON.stringify(data))
        resolve(data)
      } else {
        resolve({ STATUS: 'NOT_FOUND' })
      }
    })
    // return new Promise<any>((resolve, reject) => {
    //   const data = readFileSync(join(process.cwd(), '/src/data/users.json'), 'utf8')

    //   resolve(data)
    // })
    // const currentData = await this.repository.findOneBy({ _id: dto._id });
    // if (currentData) {
    //   return await this.repository.update({ _id: dto._id }, Object.assign(currentData, dto));
    // }
    // return null
  }

  async delete(id: string): Promise<DeleteResult> {
    return new Promise<any>((resolve, reject) => {
      const data: any = JSON.parse(readFileSync(join(process.cwd(), '/src/data/users.json'), 'utf8'))
      const index = data.findIndex((el: any) => el._id === id)
      if (index > -1) {
        data.splice(index, 1)
        writeFileSync(join(process.cwd(), '/src/data/users.json'), JSON.stringify(data))
        resolve(data)
      } else {
        resolve({ STATUS: 'NOT_FOUND' })
      }
    })
    // return await this.repository.delete({ _id: id });
  }

  async findById(id: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const data: any = JSON.parse(readFileSync(join(process.cwd(), '/src/data/users.json'), 'utf8'))
      const index = data.findIndex((el: any) => el._id === id)
      if (index > -1) {
        resolve(this.buildDataRO(data[index]))
      } else {
        resolve({ STATUS: 'NOT_FOUND' })
      }
    })
    // const data = await this.repository.findOneBy({ _id: id });
    // if (!data) {
    //   const errors = { error: 'NOT_FOUND' };
    //   throw new HttpException({ errors }, 401);
    // }

    // return this.buildDataRO(data);
  }

  async findByEmail(email: any): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const data: any = JSON.parse(readFileSync(join(process.cwd(), '/src/data/users.json'), 'utf8'))
      resolve(data.find((el: any) => el.email === email))
    })
    // const data = await this.repository.findOneBy({ email });

    // if (!data) {
    //   const errors = { error: 'NOT_FOUND' };
    //   throw new HttpException({ errors }, 401);
    // }

    // return this.buildDataRO(data);
  }

  public generateJWT(data) {
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    return jwt.sign(
      {
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
      type: entity.type,
      token: this.generateJWT(entity),
      organization: entity.organization,
      portfolioIds: entity.portfolioIds,
      projectIds: entity.projectIds,
    };

    return data;
  }
}
