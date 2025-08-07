import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Injectable()
export class ProjectService {
  constructor(@InjectConnection('projects') private connection: Connection) {}
}
