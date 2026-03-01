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

import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
@Injectable()
export class ExpertiseService {
  constructor(
    @InjectRepository(ExpertiseEntity)
    private readonly repository: Repository<ExpertiseEntity>,
    private readonly projectScienceService: ProjectScienceService,
    private readonly userService: UserService
  ) {}

  async findAll(id: string): Promise<Array<IExpertiseData>> {
    return new Promise<any>(async (resolve, reject) => {
      const project = await this.projectScienceService.findById(id);
      const data = JSON
        .parse(readFileSync(join(process.cwd(), '/src/data/expertise.json'), 'utf8'))
        .filter((item: any) => project.projectExpertiseIds?.find((projectId: any) => projectId === item._id))
        .map((item: any) => this.buildDataRO(item))
      resolve(data)
    })
    // const project = await this.projectScienceService.findById(id);
    // return await this.repository
    //   .find()
    //   .then(data => data
    //     .filter((el: ExpertiseEntity) => project.projectExpertiseIds?.find((idProject: string) => idProject === el._id))
    //     .map((el: ExpertiseEntity) => this.buildDataRO(el))
    //   );
  }

  async findById(id: string): Promise<IExpertiseData> {
    return new Promise<any>((resolve, reject) => {
      const data: any = JSON.parse(readFileSync(join(process.cwd(), '/src/data/expertise.json'), 'utf8'))
      const index = data.findIndex((el: any) => el._id === id)
      if (index > -1) {
        resolve(this.buildDataRO(data[index]))
      } else {
        resolve({ STATUS: 'NOT_FOUND' })
      }
    })
    // const data = await this.repository.findOneBy({ _id: id });

    // if (!data) {
    //   const errors = { data: 'NOT_FOUND' };
    //   throw new HttpException({ errors }, 401);
    // }

    // return this.buildDataRO(data);
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

      return new Promise<any>(async (resolve, reject) => {
        project.projectExpertiseIds?.push(newEntity._id)
        await this.projectScienceService.update(project._id, project);
        // const decoded: any = jwt.verify(token, SECRET);
        // const user = await this.userService.findByEmail(decoded.email);
        // console.log(user)
        // user.projectIds.push(newEntity._id)
        // await this.userService.update(user);
  
        const data: any = JSON.parse(readFileSync(join(process.cwd(), '/src/data/experise.json'), 'utf8'))
        data.push(newEntity)
        writeFileSync(join(process.cwd(), '/src/data/experise.json'), JSON.stringify(data))
        resolve(this.buildDataRO(newEntity))
      })
    
      // const saveNewEntity = await this.repository.save(newEntity)
      // project.projectExpertiseIds.push(newEntity._id)
      // await this.projectScienceService.update(project._id, project);
      // newEntity.email.forEach(async (item: any) => {
      //   const user = await this.userService.findByEmail(item.email);
      //   if (user.projectIds.indexOf(project._id) === -1) {
      //     user.projectIds.push(project._id)
      //   }
      //   await this.userService.update(user);
      // });
      // return this.buildDataRO(saveNewEntity);
    }
  }

  async update(dto: UpdateDto): Promise<UpdateResult | null> {
    return new Promise<any>((resolve, reject) => {
      const data: any = JSON.parse(readFileSync(join(process.cwd(), '/src/data/expertise.json'), 'utf8'))
      const index = data.findIndex((el: any) => el._id === dto._id)
      if (index > -1) {
        data[index] = Object.assign(data[index], dto)
        writeFileSync(join(process.cwd(), '/src/data/expertise.json'), JSON.stringify(data))
        resolve(data)
      } else {
        resolve({ STATUS: 'NOT_FOUND' })
      }
    })
    // const currentData = await this.repository.findOneBy({ _id: dto._id });
    // if (currentData) {
    //   return await this.repository.update({ _id: dto._id }, Object.assign(currentData, dto));
    // }
    // return null
  }
  
  async delete(idExpertise: string, id: string): Promise<DeleteResult> {
    return new Promise<any>(async (resolve, reject) => {
      const exp: any = JSON.parse(readFileSync(join(process.cwd(), '/src/data/expertise.json'), 'utf8'))
      const indexExp = exp.findIndex((el: any) => el._id === id)

      const project = await this.projectScienceService.findById(id);
      const indexProj = project.projectExpertiseIds?.findIndex((ids: string) => ids === id)
      if (indexProj && indexProj > -1) {
        project.projectExpertiseIds?.splice(indexProj, 1)
        await this.projectScienceService.update(project._id, project);
      }

      // exp[indexExp].email.forEach(async (item: any) => {
      //   const user = await this.userService.findByEmail(item.email);
      //   if (user.projectIds.indexOf(project._id) > -1) {
      //     user.projectIds.splice(user.projectIds.indexOf(project._id), 1)
      //   }
      //   await this.userService.update(user);
      // });

      if (indexExp > -1) {
        exp.splice(indexExp, 1)
        writeFileSync(join(process.cwd(), '/src/data/expertise.json'), JSON.stringify(exp))
        resolve(exp)
      } else {
        resolve({ STATUS: 'NOT_FOUND' })
      }
    })

    // const data: any = await this.repository.findOneBy({ _id: idExpertise });
    // const project = await this.projectScienceService.findById(id);
    // if (!project.projectExpertiseIds) {
    //   project.projectExpertiseIds = []
    // }
    // if (project.projectExpertiseIds.findIndex((ids: string) => ids === id) > -1) {
    //   project.projectExpertiseIds.splice(project.projectExpertiseIds.findIndex((ids: string) => ids === id), 1)
    // }
    // await this.projectScienceService.update(project._id, project);

    // data.email.forEach(async (item: any) => {
    //   const user = await this.userService.findByEmail(item.email);
    //   if (user.projectIds.indexOf(project._id) > -1) {
    //     user.projectIds.splice(user.projectIds.indexOf(project._id), 1)
    //   }
    //   await this.userService.update(user);
    // });
    // return await this.repository.delete({ _id: idExpertise });
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
