import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Injectable()
export class PorfolioService {
  constructor(@InjectConnection('portfolios') private connection: Connection) {}
}
