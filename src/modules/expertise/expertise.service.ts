import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult, UpdateResult } from 'typeorm';
import { ExpertiseEntity } from './expertise.entity';
import { CreateDto, UpdateDto } from './dto';
import { IExpertiseData } from './expertise.interface';
import { validate } from 'class-validator';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { HttpStatus } from '@nestjs/common';
import { v6 } from 'uuid';
import { ProjectScienceService } from '../project-science/project.service';
import { UserService } from '../user/user.service';

@Injectable()
export class ExpertiseService {
  constructor(
    @InjectRepository(ExpertiseEntity)
    private readonly repository: Repository<ExpertiseEntity>,
    private readonly projectScienceService: ProjectScienceService,
    private readonly userService: UserService
  ) {}

  async findAll(id: string): Promise<Array<IExpertiseData>> {
    const project = await this.projectScienceService.findById(id);
    return await this.repository
      .find()
      .then(data => data
        .filter((el: ExpertiseEntity) => project.projectExpertiseIds?.find((idProject: string) => idProject === el._id))
        .map((el: ExpertiseEntity) => this.buildDataRO(el))
      );
  }

  async findById(id: string): Promise<IExpertiseData> {
    const data = await this.repository.findOneBy({ _id: id });

    if (!data) {
      const errors = { data: 'NOT_FOUND' };
      throw new HttpException({ errors }, 401);
    }

    return this.buildDataRO(data);
  }

  async create(dto: CreateDto, id: string): Promise<IExpertiseData> {
    // const data = await this.repository.findOneBy({ theme: dto.theme });
    // if (data) {
    //   const errors = { project: 'DATA_ALREADY_EXSIST' };
    //   throw new HttpException(
    //     { message: 'Input data validation failed', errors },
    //     HttpStatus.BAD_REQUEST,
    //   );
    // }
    const newEntity = new ExpertiseEntity();
    newEntity._id = v6();
    newEntity.email = dto.email;
    newEntity.projectId = id;
    newEntity.risksLean = dto.risksLean;
    newEntity.risksDigital = dto.risksDigital;
    newEntity.risksClassic = dto.risksClassic;
    newEntity.status = dto.status
    newEntity.approve = dto.approve
  
    const saveNewEntity = await this.repository.save(newEntity)
    const project = await this.projectScienceService.findById(id);
    if (!project.projectExpertiseIds) {
      project.projectExpertiseIds = []
    }
    project.projectExpertiseIds.push(newEntity._id)
    await this.projectScienceService.update(project._id, project);
    const user = await this.userService.findByEmail(newEntity.email);
    if (user.projectIds.indexOf(project._id) === -1) {
      user.projectIds.push(project._id)
    }
    await this.userService.update(user);

    return this.buildDataRO(saveNewEntity);
  }

  async update(dto: UpdateDto): Promise<UpdateResult | null> {
    const currentData = await this.repository.findOneBy({ _id: dto._id });
    if (currentData) {
      return await this.repository.update({ _id: dto._id }, Object.assign(currentData, dto));
    }
    return null
  }
  
  async delete(id: string): Promise<DeleteResult> {
    const data = await this.repository.findOneBy({ _id: id });
    return await this.repository.delete({ _id: id });
  }

  private buildDataRO(entity: ExpertiseEntity): IExpertiseData {
    return {
      _id: entity._id,
      email: entity.email,
      risksLean: entity.risksLean,
      risksDigital: entity.risksDigital,
      risksClassic: entity.risksClassic,
      status: entity.status,
      projectId: entity.projectId,
      approve: entity.approve,
    };
  }
}
