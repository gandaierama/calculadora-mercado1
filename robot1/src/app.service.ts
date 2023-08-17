import { Injectable, Logger } from '@nestjs/common';

import { Repository } from 'typeorm';
import axios from 'axios';
import { Cron } from '@nestjs/schedule';
import * as cheerio from 'cheerio';
import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';

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

    puppeteer.use(StealthPlugin());
    this.logger.debug('Called when the current second is 45');
    const URL = `https://pt.aliexpress.com/category/201003448/suits-sets.html?category_redirect=1`;
    const browser = await puppeteer.launch({
      args: [
        '--disable-gpu',
        '--disable-setuid-sandbox',
        '--window-size=1920,1080',
        '--start-maximized',
        '--no-sandbox',
      ],
      ignoreDefaultArgs: ['--disable-extensions'],
      headless: false,
    });
    const context = await browser.createIncognitoBrowserContext();
    console.log((await browser.pages()).length);

    const page = (await browser.pages())[0];

    // Add Headers 
    await page.setExtraHTTPHeaders({ 
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36', 
      'upgrade-insecure-requests': '1', 
      'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8', 
      'accept-encoding': 'gzip, deflate, br', 
      'accept-language': 'en-US,en;q=0.9,en;q=0.8' 
    }); 

    // await page.setDefaultNavigationTimeout(4000);
    await page.goto(URL, {
      waitUntil: 'networkidle2',
    });

    //await page.waitForNavigation();
    await page.waitForTimeout((Math.floor(Math.random() * 12) + 5) * 1000) 
    
    const title = await page.title();

    const results = await page.evaluate(() => {
      const propertyList = [];
      // document.scrollingElement.scrollTop = document.body.scrollHeight;
      
      document
        .querySelectorAll('.search-card-item')
        .forEach((z) => {

          const data = {
            image: z.querySelector('div > img')?.getAttribute('src'),
            link: z.getAttribute('href'),
            name: z.querySelector('div > div > h1')?.textContent
          };
          
          propertyList.push(data);
        });

      return propertyList;
    });

    const resSize= await results.length;
    for(let i=0; i < resSize; i++){
        var res= results[i];

        var obje2 = new Produto();
        obje2.image=res.image;
        obje2.name= res.name;
        await this.create(obje2);

    }

    console.log('page :', page);
    console.log('title :', title);
    console.log('results :', results);
    console.log('size :', resSize);

    // console.log('getDataViaPuppeteer results :', results);

    await page.close();
    await browser.close();
    // const list=await this.produtoRepository.find();
    // console.log(list);
    // this.logger.log('base :', list);
  }


  getHello(): string {
    return 'Hello World!';
  }


}