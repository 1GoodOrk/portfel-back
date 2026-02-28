import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult, UpdateResult } from 'typeorm';
import { ProjectScienceEntity } from './project.entity';
import { CreateDto, UpdateDto } from './dto';
import { ProjectScienceData } from './project.interface';
import { validate } from 'class-validator';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { HttpStatus } from '@nestjs/common';
import { v6 } from 'uuid';
import * as jwt from 'jsonwebtoken';
import { SECRET } from '@port/config';
import { UserService } from '../user/user.service';

@Injectable()
export class ProjectScienceService {
  constructor(
    @InjectRepository(ProjectScienceEntity)
    private readonly repository: Repository<ProjectScienceEntity>,
    private readonly userService: UserService
  ) {}

  async findAll(token?: string): Promise<Array<ProjectScienceData>> {
    if (token) {
      const decoded: any = jwt.verify(token, SECRET);
      const user = await this.userService.findByEmail(decoded.email);
      const result: any = []
      for (let i = 0; i < user.projectIds.length; i++) {
        const found: any = await this.repository.findOneBy({ _id: user.projectIds[i] })
        if (found) {
          result.push(this.buildDataRO(found))
        }
      }
      return result
    }
    return await this.repository
      .find()
      .then(data => data.map((el: ProjectScienceEntity) => this.buildDataRO(el)));
  }

  async findById(id: string): Promise<ProjectScienceData> {
    const data = await this.repository.findOneBy({ _id: id });

    if (!data) {
      const errors = { data: 'NOT_FOUND' };
      throw new HttpException({ errors }, 401);
    }

    return this.buildDataRO(data);
  }

  async create(dto: CreateDto, token: string): Promise<ProjectScienceData> {
    const data = await this.repository.findOneBy({ name: dto.name });
    if (data) {
      const errors = { project: 'DATA_ALREADY_EXSIST' };
      throw new HttpException(
        { message: 'Input data validation failed', errors },
        HttpStatus.BAD_REQUEST,
      );
    }
    const newEntity = new ProjectScienceEntity();

    newEntity._id = v6();
    newEntity.name = dto.name;
    newEntity.type = dto.type;
    newEntity.projectGoal = dto.projectGoal;
    newEntity.projectProduct = dto.projectProduct;
    newEntity.des = dto.des;
    newEntity.priority = dto.priority;
    newEntity.responsibleName = dto.responsibleName;
    newEntity.customer = dto.customer;
    newEntity.numberOfOrderDocument = dto.numberOfOrderDocument;
    newEntity.data = dto.data;
    newEntity.staff = dto.staff;
    newEntity.projectExpertiseIds = [] 

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

  async update(id: string, dto: UpdateDto): Promise<UpdateResult | null> {
    const currentData = await this.repository.findOneBy({ _id: dto._id });
    if (currentData) {
      return await this.repository.update({ _id: dto._id }, Object.assign(currentData, dto));
    }
    return null
  }

  async delete(id: string, token: string): Promise<DeleteResult> {
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

  private buildDataRO(entity: ProjectScienceEntity): ProjectScienceData {
    return {
      _id: entity._id,
      name: entity.name,
      type: entity.type,
      projectGoal: entity.projectGoal,
      projectProduct: entity.projectProduct,
      des: entity.des,
      priority: entity.priority,
      responsibleName: entity.responsibleName,
      customer: entity.customer,
      numberOfOrderDocument: entity.numberOfOrderDocument,
      data: entity.data,
      staff: entity.staff,
      projectExpertiseIds: entity.projectExpertiseIds
    };
  }
}
