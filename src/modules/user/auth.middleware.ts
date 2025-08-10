import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { NestMiddleware, HttpStatus, Injectable } from '@nestjs/common';
// import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { SECRET } from '@port/config';
import { UserService } from './user.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}

  async use(req: Request | any, res: Response, next: NextFunction) {
    const [type, token] = req.headers.authorization?.split(' ') ?? [];
    if (token) {
      const decoded: any = jwt.verify(token, SECRET);
      const user = await this.userService.findById(decoded.id);
      console.log(token, user)
      if (!user) {
        throw new HttpException('NOT_FOUND', HttpStatus.UNAUTHORIZED);
      }

      req.body = user.data;
      next();
    } else {
      throw new HttpException('NOT_AUTH', HttpStatus.UNAUTHORIZED);
    }
  }
}
