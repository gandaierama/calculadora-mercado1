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

  private intera=3;

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

  @Cron('*/3 * * * * *')
  async handleCron() {
    this.intera=this.intera+1;
    puppeteer.use(StealthPlugin());
    this.logger.debug('Called when the current second is 45');
    const URL = `https://pt.aliexpress.com/category/201001892/men-clothing.html?category_redirect=1&page=`+this.intera;
    const browser = await puppeteer.launch({
      args: [
        '--disable-gpu',
        '--disable-setuid-sandbox',
        '--window-size=1920,1080',
        '--start-maximized',
        '--disable-dev-shm-usage',
        '--disk-cache-dir=/tmp/browser-cache-disk',
        '--no-sandbox',
      ],
      ignoreHTTPSErrors: true,
      defaultViewport: {
        width: 1920,
        height: 1080,
      },
      ignoreDefaultArgs: ['--disable-extensions', '--enable-automation'],
      headless: true,
    });
    const context = await browser.createIncognitoBrowserContext();
    const page = await browser.newPage();
    await page.setViewport({width: 1920, height: 1080});
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
    //..++++++await page.waitForTimeout((Math.floor(Math.random() * 12) + 5) * 100) 
    



    console.log('title :', await page.title());
    const results = await page.evaluate(() => {
      const propertyList = [];
      // document.scrollingElement.scrollTop = document.body.scrollHeight;
      window.scrollTo(0, 800);
      document
        .querySelectorAll('.search-card-item')
        .forEach((z) => {

          var image =z.querySelector('div > img')?.getAttribute('src');
          var link = z.getAttribute('href');
          var name = z.querySelector('div > div > h1')?.textContent;
          var piece= link.split(".html");
          var piece2= piece[0].split("item/");
          var data = {
            idAli: piece2[1],
            image: image,
            link: link,
            name: name
          };
          
          propertyList.push(data);
        });

      return propertyList;
    });

        const resSize= await results.length;

    if(resSize > 0){
      for(let i=0; i < resSize; i++){
          var res= results[i];

          var obje2 = new Produto();
          obje2.image=res.image;
          obje2.name= res.name;
          obje2.link= res.link;
          obje2.idAli= res.idAli;
          await this.create(obje2);

      }
    }

    

    console.log('page :', page);

    console.log('results :', results);
    console.log('size :', resSize);

    // console.log('getDataViaPuppeteer results :', results);
    await page.screenshot({path: this.intera+'check.png'});
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