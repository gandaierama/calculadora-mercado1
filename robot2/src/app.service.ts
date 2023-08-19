import { Injectable, Logger } from '@nestjs/common';

import { Repository } from 'typeorm';
import axios from 'axios';
import { Cron } from '@nestjs/schedule';
import * as cheerio from 'cheerio';
import * as puppeteer from 'puppeteer';


import {InjectRepository} from '@nestjs/typeorm';
import {CreateProdutoDto} from './produtos/dto/create-produto.dto';
import {UpdateProdutoDto} from './produtos/dto/update-produto.dto';
import {Produto} from './produtos/entities/produto.entity';


@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Produto)
    private produtoRepository: Repository<Produto>
  ) {}

  private readonly logger = new Logger(AppService.name);


  @Cron('0 */2 * * * *')
  async handleCron() {

  
    this.logger.debug('Called every 2 minutes - robot2');



  }


  getHello(): string {
    return 'Hello World!';
  }


}