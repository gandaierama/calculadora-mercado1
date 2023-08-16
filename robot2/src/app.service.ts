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


  create(createProdutoDto: CreateProdutoDto): Promise<Produto> {
    console.log('Back Create1', createProdutoDto);
    const obje = new Produto();
    obje.name = createProdutoDto.name;
    obje.idAli = createProdutoDto.idAli;
    obje.link = createProdutoDto.link;
    obje.image = createProdutoDto.image;
    obje.category = createProdutoDto.category;

  
    console.log('Back Create2', obje);
    return this.produtoRepository.save(obje);
  }

  @Cron('45 * * * * *')
  async handleCron() {

  
    this.logger.debug('Called when the current second is 45 - robot2');

    await fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then(response => response.json())
      .then(json => console.log(json));
   
    const list =await this.produtoRepository.find();

    console.log("lista", list);
  }


  getHello(): string {
    return 'Hello World!';
  }


}