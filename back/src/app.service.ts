import { Injectable } from '@nestjs/common';
import axios from 'axios';

import categories from '../categories.json';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }



  async getCalc1(){

    var sub=[];
    var sub1;
    let json1= JSON.stringify(categories);
    let json2= JSON.parse(json1);

    let sizeJson = json2.length;

    for(let i =0; i < sizeJson; i++ ){
         
            sub.push({name: json2[i].name, id: json2[i].id});
    }
    console.log(sub);

    sub1= JSON.stringify(sub);
    return sub1;
  }

  async getCalc2(){
    return 'Hello World!';
  }

  async getCalc3(){
    return 'Hello World!';
  }

}
