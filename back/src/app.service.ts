import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import axios from 'axios';
import { Produto } from './produtos/entities/produto.entity';
import categories from '../categories.json';
import { Cron } from '@nestjs/schedule';
import * as cheerio from 'cheerio';

import type { Browser } from 'puppeteer';
import { InjectBrowser } from 'nest-puppeteer';


@Injectable()
export class AppService {
    constructor(@InjectBrowser() private readonly browser: Browser) {}

  private readonly logger = new Logger(AppService.name);

  @Cron('45 * * * * *')
  async handleCron() {

    const version = await this.browser.version();

   const result = await  axios.get('https://pt.aliexpress.com/category/201001900/women-clothing.html')
  .then(function (response) {
    // handle success
    //console.log(response.data);

    const content = cheerio.load(response.data);
    const response2 =content.html();

    console.log("Data", response2);
    return response2;
  })
  .catch(function (error) {
    // handle error
    console.log(error);
    return error;
  })
  .then(function () {
    // always executed
  });
    this.logger.debug(result);
    this.logger.debug('Called when the current second is 45');
  }


  getHello(): string {
    return 'Hello World!';
  }



 async getImage(){
  const accessKeyId="LTAI5t6wj5c71aKhbBAdANs6";
  const apiKey = "ZllWBRXVayVELeUR3NJ5UVJyPcu3lf";  
  const result = await  axios.get('http://imagesearch.cn-shanghai.aliyuncs.com/v2/image/search',
  {
    
  }

    )
  .then(function (response) {
    // handle success
    //console.log(response.data);

    const content = cheerio.load(response.data);
    const response2 =content.html();

    console.log("Data", response2);
    return response2;
  })
  .catch(function (error) {
    // handle error
    console.log(error);
    return error;
  })
  .then(function () {
    // always executed
  });


  }


  async getImage2(){
  
  const apiKey = "";  
  const result = await  axios.get('http://imagesearch.cn-shanghai.aliyuncs.com/v2/image/search')
  .then(function (response) {
    // handle success
    //console.log(response.data);

    const content = cheerio.load(response.data);
    const response2 =content.html();

    console.log("Data", response2);
    return response2;
  })
  .catch(function (error) {
    // handle error
    console.log(error);
    return error;
  })
  .then(function () {
    // always executed
  });



  }










///////////
  async getCalc1(){
    var sub=[];
    var sub1;
    let json1= await JSON.stringify(categories);
    let json2= await JSON.parse(json1);
    let sizeJson = json2.length;

    for(let i =0; i < sizeJson; i++ ){   
      sub.push({name: json2[i].name, id: json2[i].id});
    }
    sub1= await JSON.stringify({data:sub});
    return sub1;
  }


  async getCalc2(params){
    var sub=[];
    var sub1;
    let json1= JSON.stringify(categories);
    let json2= JSON.parse(json1);
    var id=params;
    let sizeJson = json2.length;
    for(let i =0; i < sizeJson; i++ ){
        if(json2[i].id==id){
          sub.push(json2[i].children);
        }
    }
    sub1= await JSON.stringify({data:sub});
    return sub1;
  }



  async getCalc3(params){
    const anuncio=Number(params.anuncio);
    const imposto=Number(params.imposto);
    const custo=Number(params.custo);
    const frete=Number(params.frete);
    const taxa=Number(params.taxa);
    const formato=Number(params.formato);
    const lucro=Number(params.lucro);
    let valor1=anuncio+ imposto;
    let valor2=custo + lucro + taxa;
    let valor3=custo + lucro + frete;
    let valor4=(lucro / custo) * 100;
    let valor5= valor2 / ((1 - valor1)/100);
    let valor6=valor3 / ((1 - valor1)/100);
    let valor7=(custo + (custo * (lucro/100)) ) -custo;
    let obj;
    obj={
      val1: valor1,
      val2: valor2,
      val3: valor3,
      val4: valor4,
      val5: valor5,
      val6: valor6,
      val7: valor7
    }
    console.log(obj);
    const res= JSON.stringify(obj);
    return res;
  }

}