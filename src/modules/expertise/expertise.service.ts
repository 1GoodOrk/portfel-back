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

  async create(dto: CreateDto, id: string): Promise<IExpertiseData | any> {
    // const data = await this.repository.findOneBy({ theme: dto.theme });
    // if (data) {
    //   const errors = { project: 'DATA_ALREADY_EXSIST' };
    //   throw new HttpException(
    //     { message: 'Input data validation failed', errors },
    //     HttpStatus.BAD_REQUEST,
    //   );
    // }
    const project = await this.projectScienceService.findById(id);
    if (!project.projectExpertiseIds) {
      project.projectExpertiseIds = []
    }
    let expertiseForThatProjectAlreadyExists: boolean = false
    const expertises = await this.repository.find()
    expertises.forEach((expert: IExpertiseData) => {
      if (expert.email === dto.email && expert.projectId === id) {
        expertiseForThatProjectAlreadyExists = true
      }
    })
    if (expertiseForThatProjectAlreadyExists) {
      new Promise((resolve) => {
        resolve({ name: 'ALLREADY_EXISTS' })
      });
    } else {
      const newEntity = new ExpertiseEntity();
      newEntity._id = v6();
      newEntity.type = dto.type;
      newEntity.email = dto.email;
      newEntity.generalExperts = dto.generalExperts;
      newEntity.projectId = id;
      newEntity.risksData = dto.risksData;
      newEntity.recommendationDescription = dto.recommendationDescription;
      newEntity.status = dto.status
      newEntity.approve = dto.approve
    
      const saveNewEntity = await this.repository.save(newEntity)
      project.projectExpertiseIds.push(newEntity._id)
      await this.projectScienceService.update(project._id, project);
      newEntity.email.forEach(async (item: any) => {
        const user = await this.userService.findByEmail(item.email);
        if (user.projectIds.indexOf(project._id) === -1) {
          user.projectIds.push(project._id)
        }
        await this.userService.update(user);
      });

      return this.buildDataRO(saveNewEntity);
    }
  }

  async update(dto: UpdateDto): Promise<UpdateResult | null> {
    const currentData = await this.repository.findOneBy({ _id: dto._id });
    if (currentData) {
      return await this.repository.update({ _id: dto._id }, Object.assign(currentData, dto));
    }
    return null
  }
  
  async delete(idExpertise: string, id: string): Promise<DeleteResult> {
    const data: any = await this.repository.findOneBy({ _id: idExpertise });
    const project = await this.projectScienceService.findById(id);
    if (!project.projectExpertiseIds) {
      project.projectExpertiseIds = []
    }
    if (project.projectExpertiseIds.findIndex((ids: string) => ids === id) > -1) {
      project.projectExpertiseIds.splice(project.projectExpertiseIds.findIndex((ids: string) => ids === id), 1)
    }
    await this.projectScienceService.update(project._id, project);
    console.log(data.email)
    data.email.forEach(async (item: any) => {
      const user = await this.userService.findByEmail(item.email);
      if (user.projectIds.indexOf(project._id) > -1) {
        user.projectIds.splice(user.projectIds.indexOf(project._id), 1)
      }
      await this.userService.update(user);
    });
    return await this.repository.delete({ _id: idExpertise });
  }

  private buildDataRO(entity: ExpertiseEntity): IExpertiseData {
    return {
      _id: entity._id,
      type: entity.type,
      email: entity.email,
      generalExperts: entity.generalExperts,
      risksData: entity.risksData,
      recommendationDescription: entity.recommendationDescription,
      status: entity.status,
      projectId: entity.projectId,
      approve: entity.approve,
    };
  }
}
