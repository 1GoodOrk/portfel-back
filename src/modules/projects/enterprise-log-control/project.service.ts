import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult, UpdateResult } from 'typeorm';
import { EnterpriseLogEntity } from './project.entity';
import { CreateDto, UpdateDto } from './dto';
import { EnterpriseLogData } from './project.interface';
import { validate } from 'class-validator';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { HttpStatus } from '@nestjs/common';
import { v6 } from 'uuid';
import * as jwt from 'jsonwebtoken';
import { SECRET } from '@port/config';
import { UserService } from '../../user/user.service';

import puppeteer from 'puppeteer-extra';
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
puppeteer.use(StealthPlugin())
import { translate } from '@vitalets/google-translate-api';


@Injectable()
export class EnterpriseLogService {
  constructor(
    @InjectRepository(EnterpriseLogEntity)
    private readonly repository: Repository<EnterpriseLogEntity>,
    private readonly userService: UserService
  ) {}

  async parsing(query: string): Promise<any> {

    // else {
    //   options.url = "https://duckduckgo.com/?ia=news&q=" + encodeURIComponent(query)
    //   options.tag = '',
    //   options.sliceS = 0,
    //   options.sliceE = 10
    // }
    // const url = "https://duckduckgo.com/?ia=news&q=" + encodeURIComponent(query)
    // const url = "https://www.eurointegration.com.ua/news/"
    let data: any = []
    return puppeteer
      .launch({ headless: true })
      .then(async browser => {
        console.log(query)
        if (query === 'Останні новини') {
          const page = await browser.newPage()
          await page.goto("https://www.eurointegration.com.ua/news/")
          const titles = await page.$$eval('a', (nodes: any) => nodes.slice(60, 80).map((n) => n.textContent?.trim()));
          data = titles
        } else if (query === 'Економіка') {
          const page = await browser.newPage()
          await page.goto("https://enovosty.com/uk/")
          const titles = await page.$$eval('a', (nodes: any) => nodes.slice(54, 80).map((n) => n.textContent?.trim()));
          data = titles
        } else if (query === 'Міжнародний бізнес') {
          const page = await browser.newPage()
          await page.goto("https://probusiness.io/world_business/")
          const titles = await page.$$eval('a', (nodes: any) => nodes.slice(30, 80).map((n) => n.textContent?.trim()));
          data = titles.filter((el: string) => el && el !== "World business").slice(8, 19)
          data = await translate(data.join('07CC'), { to: 'uk' })
          data = data.text.split('07CC')
        } else {
          const page = await browser.newPage()
          await page.goto("https://duckduckgo.com/?ia=news&q=" + encodeURIComponent(query))
          const titles = await page.$$eval('h2', (nodes: any) => nodes.slice(0, 10).map((n) => n.textContent?.trim()));
          data = titles.filter((el: string) => el && el !== "World business").slice(8, 19)
          data = await translate(data.join('07CC'), { to: 'uk' })
          data = data.text.split('07CC')
        }
        // // console.log('Running tests..')
        // const page = await browser.newPage()
        // await page.goto(options.url)
        // // await page.waitForTimeout(5000)
        // // await page.screenshot({ path: 'testresult.png', fullPage: true })
        // console.log(`All done, check the screenshot. ✨`, options.tag)
        // // const titles = await page.$$eval('h2', (nodes: any) => nodes.slice(0, 10).map((n) => n.textContent?.trim()));
        // const titles = await page.$$eval(options.tag, (nodes: any) => nodes.slice(options.sliceS, options.sliceE).map((n) => n.textContent?.trim()));
        // // data = await translate(titles.join('____DUDE____'), { to: 'ua' })
        // // titles.forEach(async(text: string) => {
        // //   console.log(await translate(text, { to: 'ua' }))
        // // });
        // data = titles
        // // data = data.map(async(text: string) => {
        // //   console.log(text)
        // //   return (await translate(text, { to: 'ua' }))
        // // })
        await browser.close()
        return { query, data }
      })
  }

  async findAll(token?: string): Promise<any> {
    if (token) {
      const decoded: any = jwt.verify(token, SECRET);
      const user = await this.userService.findByEmail(decoded.email);
      const result: any = []
      for (let i = 0; i < user.projectIds.length; i++) {
        // await this.repository.findOneBy({ _id: user.projectIds[i] });
        const found: any = await this.repository.findOneBy({ _id: user.projectIds[i] })
        if (found) {
          result.push(this.buildDataRO(found))
        }
      }
      return result
    }
    return await this.repository
      .find()
      .then(data => data.map((el: EnterpriseLogEntity) => this.buildDataRO(el)));
  }

  async findById(id: string): Promise<any> {
    const data = await this.repository.findOneBy({ _id: id });

    if (!data) {
      const errors = { data: 'NOT_FOUND' };
      throw new HttpException({ errors }, 401);
    }

    return this.buildDataRO(data);
  }

  async create(dto: CreateDto, token: string): Promise<any> {
    const data = await this.repository.findOneBy({ name: dto.name, subinfo: dto.subinfo });
    if (data) {
      const errors = { project: 'DATA_ALREADY_EXSIST' };
      throw new HttpException(
        { message: 'Input data validation failed', errors },
        HttpStatus.BAD_REQUEST,
      );
    }
    const newEntity = new EnterpriseLogEntity();

    newEntity._id = v6();
    newEntity.name = dto.name;
    newEntity.des = dto.des;
    newEntity.priority = dto.priority;
    newEntity.subinfo = dto.subinfo;
    newEntity.responsibleName = dto.responsibleName;
    newEntity.risksTableParams = dto.risksTableParams;
    newEntity.risks = dto.risks;
    newEntity.dateCreation = dto.dateCreation;
    newEntity.options = dto.options;
    
    // TODO: error for validation => check functionality
    // const errors = await validate(newEntity);
    // if (errors.length > 0) {
    //   const _errors = { data: 'NOT_VALID' };
    //   throw new HttpException(
    //     { message: 'Input data validation failed', _errors },
    //     HttpStatus.BAD_REQUEST,
    //   );
    // } else {
    // console.log(this.buildDataRO(await this.repository.save(newEntity)))
    // }
    const saveNewEntity = await this.repository.save(newEntity)
    const decoded: any = jwt.verify(token, SECRET);
    const user = await this.userService.findByEmail(decoded.email);
    user.projectIds.push(newEntity._id)
    await this.userService.update(user);
    return this.buildDataRO(saveNewEntity);
  }

  async update(id: string, dto: UpdateDto): Promise<any> {
    const currentData = await this.repository.findOneBy({ _id: dto._id });
    if (currentData) {
      return await this.repository.update({ _id: dto._id }, Object.assign(currentData, dto));
    }
    return null
  }

  async delete(id: string, token: string): Promise<any> {
    const result = await this.repository.delete({ _id: id });
    if (token) {
      const decoded: any = jwt.verify(token, SECRET);
      const user = await this.userService.findByEmail(decoded.email);
      const index = user.projectIds.indexOf(id);
      if (index > -1) { 
        user.projectIds.splice(index, 1);
      }
      await this.userService.update(user);
    }
    return result
  }

  private buildDataRO(entity: any): any {
    return {
      _id: entity._id,
      name: entity.name,
      subinfo: entity.subinfo,
      des: entity.des,
      priority: entity.priority,
      responsibleName: entity.responsibleName,
      risksTableParams: entity.risksTableParams,
      risks: entity.risks,
      dateCreation: entity.dateCreation,
      options: entity.options
    };
  }
}
