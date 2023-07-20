import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';
@Injectable()
export class AppService {


  async getHello() {
    const URL = `https://pt.aliexpress.com/category/201003912/blouses-shirts.html`;
    const browser = await puppeteer.launch({
      headless: false,
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

          propertyList.push(data);
        });

      return propertyList;
    });

    console.log('getDataViaPuppeteer results :', results);
    await page.close();
    await browser.close();
    return results;
  }
}
