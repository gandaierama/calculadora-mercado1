import { Injectable, Logger } from '@nestjs/common';

import { Repository } from 'typeorm';
import axios from 'axios';
import { Cron } from '@nestjs/schedule';
import * as cheerio from 'cheerio';
import * as puppeteer from 'puppeteer';


import {InjectRepository} from '@nestjs/typeorm';

import {Produto} from './produtos/entities/produto.entity';


@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Produto)
    private produtoRepository: Repository<Produto>
  ) {}

  private readonly logger = new Logger(AppService.name);


  @Cron('45 * * * * *')
  async handleCron() {

  
    this.logger.debug('Called when the current second is 45 -robot3');
    
  }


  getHello(): string {
    return 'Hello World!';
  }


}