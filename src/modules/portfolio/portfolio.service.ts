import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { PortfolioEntity } from './portfolio.entity';
import { CreateDto, UpdateDto } from './dto';
import { PortfolioDataRO, PortfolioData } from './portfolio.interface';
import { validate } from 'class-validator';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { HttpStatus } from '@nestjs/common';
import { v6 } from 'uuid';

@Injectable()
export class PortfolioService {
  constructor(
    @InjectRepository(PortfolioEntity)
    private readonly repository: Repository<PortfolioEntity>,
  ) {}

  async findAll(): Promise<Array<PortfolioDataRO>> {
    return await this.repository
      .find()
      .then(data => data.map((el: PortfolioEntity) => this.buildDataRO(el)));
  }

  async findById(id: string): Promise<PortfolioDataRO> {
    const data = await this.repository.findOneBy({ _id: id });

    if (!data) {
      const errors = { data: 'NOT_FOUND' };
      throw new HttpException({ errors }, 401);
    }

    return this.buildDataRO(data);
  }
  async create(dto: CreateDto): Promise<PortfolioDataRO> {
    const data = await this.repository.findOneBy({ name: dto.name, subinfo: dto.subinfo });

    if (data) {
      const errors = { data: 'DATA_ALREADY_EXSIST' };
      throw new HttpException(
        { message: 'Input data validation failed', errors },
        HttpStatus.BAD_REQUEST,
      );
    }

    const newEntity = new PortfolioEntity();
    newEntity._id = v6();
    newEntity.name = dto.name;
    newEntity.img = dto.img;
    newEntity.des = dto.des;
    newEntity.projects = dto.projects;
    newEntity.projectIds = dto.projectIds;
    newEntity.subinfo = dto.subinfo;
    newEntity.budget = dto.budget;
    newEntity.profit = dto.profit;
    newEntity.duration = dto.duration;
    newEntity.location = dto.location;
    if (newEntity.location === 'OUTSIDE') {
      newEntity.town = dto.town;
    }
    newEntity.optionEco = dto.options.eco;
    newEntity.optionWar = dto.options.war;
    newEntity.optionLog = dto.options.log;
    newEntity.optionDoc = dto.options.doc;
    newEntity.optionStruc = dto.options.struc;

    // const errors = await validate(newEntity);
    // if (errors.length > 0) {
    //   const _errors = { username: 'Userinput is not valid.' };
    //   throw new HttpException(
    //     { message: 'Input data validation failed', _errors },
    //     HttpStatus.BAD_REQUEST,
    //   );
    // } else {
    //   return this.buildDataRO(await this.repository.save(newEntity));
    // }
    return this.buildDataRO(await this.repository.save(newEntity));
  }

  async update(id: string, dto: UpdateDto): Promise<UpdateResult | null> {
    const currentData = await this.repository.findOneBy({ _id: dto._id });
    if (currentData) {
      return await this.repository.update({ _id: dto._id }, Object.assign(currentData, dto));
    }
    return null
  }

  async delete(id: string): Promise<DeleteResult> {
    return await this.repository.delete({ _id: id });
  }

  private buildDataRO(entity: PortfolioEntity): PortfolioDataRO {
    return {
      _id: entity._id,
      name: entity.name,
      img: entity.img,
      des: entity.des,
      projects: entity.projects,
      projectIds: entity.projectIds,
      subinfo: entity.subinfo,
      budget: entity.budget,
      profit: entity.profit,
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
  }
}
