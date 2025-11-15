import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { SECRET } from '../../config';
import * as jwt from 'jsonwebtoken';

export const Project = createParamDecorator((data: any, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest();

  if (!!req.data) {
    return !!data ? req.data[data] : req.data;
  }

  const token = req.headers.authorization ? (req.headers.authorization as string).split(' ') : null;
  if (token && token[1]) {
    const decoded: any = jwt.verify(token[1], SECRET);
    return !!data ? decoded[data] : decoded.data;
  }
});