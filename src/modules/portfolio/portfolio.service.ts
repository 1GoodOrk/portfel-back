import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
// import { PortfolioEntity } from './portfolio.entity';
import { CreateDto, UpdateDto } from './dto';
import { PortfolioDataRO, PortfolioData } from './portfolio.interface';
import { validate } from 'class-validator';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { HttpStatus } from '@nestjs/common';
import { v6 } from 'uuid';
import * as jwt from 'jsonwebtoken';
import { SECRET } from '@port/config';
import { UserService } from '../user/user.service';
import { ProjectService } from '../project/project.service';

@Injectable()
export class PortfolioService {
  constructor(
    // @InjectRepository(PortfolioEntity)
    // private readonly repository: Repository<PortfolioEntity>,
    private readonly userService: UserService,
    private readonly projectService: ProjectService
  ) {}

  async findAll(token?: string): Promise<any> {
    // if (token) {
    //   const decoded: any = jwt.verify(token, SECRET);
    //   const user = await this.userService.findByEmail(decoded.email);
    //   const result: any = []
    //   for (let i = 0; i < user.portfolioIds.length; i++) {
    //     const found: any = await this.repository.findOneBy({ _id: user.portfolioIds[i] })
    //     result.push(this.buildDataRO(found))
    //   }
    //   return result
    // }
    // return await this.repository
    //   .find()
    //   .then(data => data.map((el: PortfolioEntity) => this.buildDataRO(el)));
  }

  async findById(id: string): Promise<any>  {
    // const data = await this.repository.findOneBy({ _id: id });

    // if (!data) {
    //   const errors = { data: 'NOT_FOUND' };
    //   throw new HttpException({ errors }, 401);
    // }

    // return this.buildDataRO(data);
  }
  async create(dto: CreateDto, token: string): Promise<any>  {
    // const data = await this.repository.findOneBy({ name: dto.name, subinfo: dto.subinfo });

    // if (data) {
    //   const errors = { data: 'DATA_ALREADY_EXSIST' };
    //   throw new HttpException(
    //     { message: 'Input data validation failed', errors },
    //     HttpStatus.BAD_REQUEST,
    //   );
    // }

    // const newEntity = new PortfolioEntity();
    // newEntity._id = v6();
    // newEntity.name = dto.name;
    // newEntity.img = dto.img;
    // newEntity.des = dto.des;
    // newEntity.responsibleName = dto.responsibleName;
    // newEntity.responsibleSurname = dto.responsibleSurname;
    // newEntity.responsibleLastname = dto.responsibleLastname;
    // newEntity.responsibleOrganization = dto.responsibleOrganization;
    // newEntity.projects = dto.projects;
    // newEntity.projectIds = dto.projectIds;
    // newEntity.subinfo = dto.subinfo;
    // newEntity.budget = dto.budget;
    // newEntity.profit = dto.profit;
    // newEntity.location = dto.location;
    // if (newEntity.location === 'OUTSIDE') {
    //   newEntity.town = dto.town;
    // }

    // // const errors = await validate(newEntity);
    // // if (errors.length > 0) {
    // //   const _errors = { username: 'Userinput is not valid.' };
    // //   throw new HttpException(
    // //     { message: 'Input data validation failed', _errors },
    // //     HttpStatus.BAD_REQUEST,
    // //   );
    // // } else {
    // //   return this.buildDataRO(await this.repository.save(newEntity));
    // // }
    // const saveNewEntity = await this.repository.save(newEntity)
    // const decoded: any = jwt.verify(token, SECRET);
    // const user = await this.userService.findByEmail(decoded.email);
    // user.portfolioIds.push(newEntity._id)
    // await this.userService.update(user);
    // Object.keys(newEntity.projectIds).forEach((tier: string) => {
    //   newEntity.projectIds[tier].forEach(async (key: any) => {
    //     if (key._id) {
    //       key = key._id
    //     }
    //     const projData = await this.projectService.findById(key);
    //     projData.portfolioId = {
    //       name: newEntity.name,
    //       tier: tier,
    //       _id: newEntity._id
    //     }
    //     await this.projectService.update(key, projData);
    //   })
    // })
    // return this.buildDataRO(saveNewEntity);
  }

  async update(id: string, dto: UpdateDto): Promise<any>  {
    // const currentData = await this.repository.findOneBy({ _id: dto._id });
    // if (currentData) {
    //   return await this.repository.update({ _id: dto._id }, Object.assign(currentData, dto));
    // }
    // return null
  }

  async delete(id: string, token: string): Promise<any>  {
    // const result = await this.repository.delete({ _id: id });
    // if (token) {
    //   const decoded: any = jwt.verify(token, SECRET);
    //   const user = await this.userService.findByEmail(decoded.email);
    //   const index = user.projectIds.indexOf(id);
    //   if (index > -1) { 
    //     user.projectIds.splice(index, 1);
    //   }
    //   await this.userService.update(user);
    // }
    // return result
  }

  private buildDataRO(entity: any): any {
    return {
      _id: entity._id,
      name: entity.name,
      img: entity.img,
      des: entity.des,
      responsibleName: entity.responsibleName,
      responsibleSurname: entity.responsibleSurname,
      responsibleLastname: entity.responsibleLastname,
      responsibleOrganization: entity.responsibleOrganization,
      projects: entity.projects,
      projectIds: entity.projectIds,
      subinfo: entity.subinfo,
      budget: entity.budget,
      profit: entity.profit,
      location: entity.location,
      town: entity.town
    };
  }
}
