import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult, UpdateResult } from 'typeorm';
import { ProjectEntity } from './project.entity';
import { CreateDto, UpdateDto } from './dto';
import { ProjectData } from './project.interface';
import { validate } from 'class-validator';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { HttpStatus } from '@nestjs/common';
import { v6 } from 'uuid';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(ProjectEntity)
    private readonly repository: Repository<ProjectEntity>,
  ) {}

  async findAll(): Promise<Array<ProjectData>> {
    return await this.repository
      .find()
      .then(data => data.map((el: ProjectEntity) => this.buildDataRO(el)));
  }

  async findById(id: string): Promise<ProjectData> {
    const data = await this.repository.findOneBy({ _id: id });

    if (!data) {
      const errors = { data: 'NOT_FOUND' };
      throw new HttpException({ errors }, 401);
    }

    return this.buildDataRO(data);
  }

  async create(dto: CreateDto): Promise<ProjectData> {
    const data = await this.repository.findOneBy({ name: dto.name, subinfo: dto.subinfo });
    if (data) {
      const errors = { project: 'DATA_ALREADY_EXSIST' };
      throw new HttpException(
        { message: 'Input data validation failed', errors },
        HttpStatus.BAD_REQUEST,
      );
    }
    const newEntity = new ProjectEntity();
    newEntity._id = v6();
    newEntity.name = dto.name;
    newEntity.subinfo = dto.subinfo;
    newEntity.type = dto.type;
    newEntity.budget = dto.budget;
    newEntity.budgetSource = dto.budgetSource;
    newEntity.processDuration = dto.processDuration;
    newEntity.profit = dto.profit;
    newEntity.traffic = dto.traffic;
    newEntity.road = dto.road;
    newEntity.distance = dto.distance;
    newEntity.mainRoad = dto.mainRoad;
    newEntity.inTown = dto.inTown;
    if (dto.town) {
      newEntity.town = dto.town;
    }
    newEntity.addressStart = dto.addressStart;
    newEntity.addressEnd = dto.addressEnd;
    newEntity.des = dto.des;
    newEntity.img = dto.img;
    newEntity.portfolioId = dto.portfolioId;
    newEntity.dateCreation = dto.dateCreation;
    newEntity.dateInitialization = dto.dateInitialization;
    newEntity.permissionDuration = dto.permissionDuration;
    newEntity.score = dto.score;
    newEntity.priority = dto.priority;
    newEntity.optionEco = dto.options.eco;
    newEntity.optionWar = dto.options.war;
    newEntity.optionLog = dto.options.log;
    newEntity.optionSoc = dto.options.soc;
    newEntity.optionStruc = dto.options.struc;

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
    return this.buildDataRO(await this.repository.save(newEntity));
  }

  async update(id: string, dto: UpdateDto): Promise<UpdateResult | null> {
    const currentData = await this.repository.findOneBy({ _id: dto.id });
    if (currentData) {
      return await this.repository.update({ _id: dto.id }, Object.assign(currentData, dto));
    }
    return null
  }

  async delete(id: string): Promise<DeleteResult> {
    return await this.repository.delete({ _id: id });
  }

  private buildDataRO(entity: ProjectEntity): ProjectData {
    return {
      _id: entity._id,
      name: entity.name,
      subinfo: entity.subinfo,
      type: entity.type,
      budget: entity.budget,
      budgetSource: entity.budgetSource,
      processDuration: entity.processDuration,
      profit: entity.profit,
      traffic: entity.traffic,
      road: entity.road,
      distance: entity.distance,
      mainRoad: entity.mainRoad,
      inTown: entity.inTown,
      town: entity.town,
      addressStart: entity.addressStart,
      addressEnd: entity.addressEnd,
      des: entity.des,
      img: entity.img,
      portfolioId: entity.portfolioId,
      dateCreation: entity.dateCreation,
      dateInitialization: entity.dateInitialization,
      permissionDuration: entity.permissionDuration,
      score: entity.score,
      priority: entity.priority,
      options: {
        eco: entity.optionEco,
        war: entity.optionWar,
        log: entity.optionLog,
        soc: entity.optionSoc,
        struc: entity.optionStruc,
      }
    };
  }
}
