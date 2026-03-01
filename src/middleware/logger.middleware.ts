import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { WinstonLogger } from '../services/winston.logger';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new WinstonLogger();
  use(req: Request, res: Response, next: NextFunction) {
    console.log(`Request url: ${req.url}, method: ${req.method}`)
    // this.logger.debug(`Request url: ${req.url}, method: ${req.method}`)
    next();
  }
}