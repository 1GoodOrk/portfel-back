import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult, UpdateResult } from 'typeorm';
import { ProjectTransportEntity } from './project.entity';
import { CreateDto, UpdateDto } from './dto';
import { ProjectTransportData } from './project.interface';
import { validate } from 'class-validator';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { HttpStatus } from '@nestjs/common';
import { v6 } from 'uuid';
import * as jwt from 'jsonwebtoken';
import { SECRET } from '@port/config';
import { UserService } from '../../user/user.service';

@Injectable()
export class ProjectTransportService {
  constructor(
    @InjectRepository(ProjectTransportEntity)
    private readonly repository: Repository<ProjectTransportEntity>,
    private readonly userService: UserService
  ) {}

  async findAll(token?: string): Promise<any> {
    if (token) {
      const decoded: any = jwt.verify(token, SECRET);
      const user = await this.userService.findByEmail(decoded.email);
      const result: any = []
      for (let i = 0; i < user.projectIds.length; i++) {
        // await this.repository.findOneBy({ _id: user.projectIds[i] });
        const found: any = await this.repository.findOneBy({ _id: user.projectIds[i] })
        if (found) {
          result.push(this.buildDataRO(found))
        }
      }
      return result
    }
    return await this.repository
      .find()
      .then(data => data.map((el: ProjectTransportEntity) => this.buildDataRO(el)));
  }

  async findById(id: string): Promise<any> {
    const data = await this.repository.findOneBy({ _id: id });

    if (!data) {
      const errors = { data: 'NOT_FOUND' };
      throw new HttpException({ errors }, 401);
    }

    return this.buildDataRO(data);
  }

  async create(dto: CreateDto, token: string): Promise<any> {
    const data = await this.repository.findOneBy({ name: dto.name, subinfo: dto.subinfo });
    if (data) {
      const errors = { project: 'DATA_ALREADY_EXSIST' };
      throw new HttpException(
        { message: 'Input data validation failed', errors },
        HttpStatus.BAD_REQUEST,
      );
    }
    const newEntity = new ProjectTransportEntity();

    newEntity._id = v6();
    newEntity.name = dto.name;
    newEntity.des = dto.des;
    newEntity.priority = dto.priority;
    newEntity.subinfo = dto.subinfo;
    newEntity.responsibleName = dto.responsibleName;
    newEntity.stackholders = dto.stackholders;
    newEntity.stackholderData = dto.stackholderData;
    newEntity.analyze = dto.analyze;
    newEntity.balance = dto.balance;
    
    // TODO: error for validation => check functionality
    // const errors = await validate(newEntity);
    // if (errors.length > 0) {
    //   const _errors = { data: 'NOT_VALID' };
    //   throw new HttpException(
    //     { message: 'Input data validation failed', _errors },
    //     HttpStatus.BAD_REQUEST,
    //   );
    // } else {
    // console.log(this.buildDataRO(await this.repository.save(newEntity)))
    // }
    const saveNewEntity = await this.repository.save(newEntity)
    const decoded: any = jwt.verify(token, SECRET);
    const user = await this.userService.findByEmail(decoded.email);
    user.projectIds.push(newEntity._id)
    await this.userService.update(user);
    return this.buildDataRO(saveNewEntity);
  }

  async update(id: string, dto: UpdateDto): Promise<any> {
    const currentData = await this.repository.findOneBy({ _id: id });
    if (currentData) {
      return await this.repository.update({ _id: id }, Object.assign(currentData, dto));
    }
    return null
  }

  async delete(id: string, token: string): Promise<any> {
    const result = await this.repository.delete({ _id: id });
    if (token) {
      const decoded: any = jwt.verify(token, SECRET);
      const user = await this.userService.findByEmail(decoded.email);
      const index = user.projectIds.indexOf(id);
      if (index > -1) { 
        user.projectIds.splice(index, 1);
      }
      await this.userService.update(user);
    }
    return result
  }

  private buildDataRO(entity: any): any {
    return {
      _id: entity._id,
      name: entity.name,
      subinfo: entity.subinfo,
      des: entity.des,
      priority: entity.priority,
      responsibleName: entity.responsibleName,
      stackholders: entity.stackholders,
      stackholderData: entity.stackholderData,
      analyze: entity.analyze,
      balance: entity.balance
    };
  }
}
