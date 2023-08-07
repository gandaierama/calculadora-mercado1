import { Injectable, Logger } from '@nestjs/common';

import { Repository } from 'typeorm';
import axios from 'axios';
import { Cron } from '@nestjs/schedule';
import * as cheerio from 'cheerio';
import * as puppeteer from 'puppeteer';




@Injectable()
export class AppService {


  private readonly logger = new Logger(AppService.name);

  @Cron('45 * * * * *')
  async handleCron() {

  
    this.logger.debug('Called when the current second is 45');
    const URL = `https://pt.aliexpress.com/category/201003912/blouses-shirts.html`;
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

    const results = await page.evaluate(() => {
      const propertyList = [];
      // document.scrollingElement.scrollTop = document.body.scrollHeight;
      
      document
        .querySelectorAll('.search-card-item')
        .forEach((z) => {

          const data = {
            img: z.querySelector('div > img').getAttribute('src'),
            link: z.getAttribute('href'),
            name: z.querySelector('div > div > h1')?.textContent
          };
          this.logger.log('data :', z);
          propertyList.push(data);
        });

      return propertyList;
    });
    const result2= await JSON.stringify(results);
    this.logger.log('getDataViaPuppeteer results :', results);

    await page.close();
    await browser.close();
  }


  getHello(): string {
    return 'Hello World!';
  }


}