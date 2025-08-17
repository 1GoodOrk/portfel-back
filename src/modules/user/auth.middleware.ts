import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { NestMiddleware, HttpStatus, Injectable } from '@nestjs/common';
// import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { SECRET } from '@port/config';
import { UserService } from './user.service';
import * as CryptoJS from 'crypto-js';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}

  async use(req: Request | any, res: Response, next: NextFunction) {
    const original = JSON.parse(CryptoJS.AES.decrypt(req.headers.authorization?.split(' ')[1], SECRET).toString(CryptoJS.enc.Utf8));
    // const [type, token] = req.headers.authorization?.split(' ') ?? [];
    // TODO: token auth
    if (original.email) {
      // const decoded: any = jwt.verify(token, SECRET);
      const user = await this.userService.findByEmail(original.email);
      if (!user) {
        throw new HttpException('NOT_FOUND', HttpStatus.UNAUTHORIZED);
      }

      req.body = user;
      next();
    } else {
      throw new HttpException('NOT_AUTH', HttpStatus.UNAUTHORIZED);
    }
  }
}
