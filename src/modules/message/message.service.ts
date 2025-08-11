import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult, UpdateResult } from 'typeorm';
import { MessageEntity } from './message.entity';
import { CreateDto, UpdateDto } from './dto';
import { MessageData } from './message.interface';
import { validate } from 'class-validator';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { HttpStatus } from '@nestjs/common';
import { v6 } from 'uuid';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(MessageEntity)
    private readonly repository: Repository<MessageEntity>,
  ) {}

  async findAll(): Promise<Array<MessageData>> {
    return await this.repository
      .find()
      .then(data => data.map((el: MessageEntity) => this.buildDataRO(el)));
  }

  async findById(id: string): Promise<MessageData> {
    const data = await this.repository.findOneBy({ _id: id });

    if (!data) {
      const errors = { data: 'NOT_FOUND' };
      throw new HttpException({ errors }, 401);
    }

    return this.buildDataRO(data);
  }

  async create(dto: CreateDto): Promise<MessageData> {
    const data = await this.repository.findOneBy({ theme: dto.theme });
    if (data) {
      const errors = { project: 'DATA_ALREADY_EXSIST' };
      throw new HttpException(
        { message: 'Input data validation failed', errors },
        HttpStatus.BAD_REQUEST,
      );
    }
    const newEntity = new MessageEntity();
    newEntity._id = v6();
    newEntity.email = dto.email;
    newEntity.status = 'NEW';
    newEntity.theme = dto.theme;
    newEntity.comment = dto.comment;

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

  private buildDataRO(entity: MessageEntity): MessageData {
    return {
      _id: entity._id,
      email: entity.email,
      status: entity.status,
      theme: entity.theme,
      comment: entity.comment
    };
  }
}
