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

  
    this.logger.debug('Called when the current second is 45');
    const URL = `https://pt.aliexpress.com/category/201001892/men-clothing.html?category_redirect=1&spm=a2g0o.best.102.1.1edb22aesfqGdU`;
    const browser = await puppeteer.launch({
      args: [
        '--disable-gpu',
        '--disable-setuid-sandbox',
        '--window-size=1920,1080',
        '--start-maximized',
        '--no-sandbox',
      ],
      ignoreDefaultArgs: ['--disable-extensions'],
      headless: true,
    });
    const context = await browser.createIncognitoBrowserContext();
    const page = await browser.newPage();

    await page.goto(URL, {
      waitUntil: 'networkidle2',
    });
    console.log('page :', page);
    const title = await page.title();

    console.log('title :', title);
    const results = await page.evaluate(() => {
      const propertyList = [];
      // document.scrollingElement.scrollTop = document.body.scrollHeight;
      
      document
        .querySelectorAll('.search-card-item')
        .forEach((z) => {

         
          const data = {
            image: z.querySelector('div > img').getProperty('src'),
            // link: z.getAttribute('href'),
            name: z.querySelector('div > div > h1')?.textContent
          };
          
          propertyList.push(data);
        });

      return propertyList;
    });
    console.log('results :', results);
    const resSize= await results.length;
    for(let i=0; i < resSize; i++){
        var res= results[i];

        var obje2 = new Produto();
        obje2.image=res.image;
        obje2.name= res.name;
        await this.create(obje2);

    }


    console.log('getDataViaPuppeteer results :', results);

    await page.close();
    await browser.close();
    const list=await this.produtoRepository.find();
    console.log(list);
    this.logger.log('base :', list);
  }


  getHello(): string {
    return 'Hello World!';
  }


}