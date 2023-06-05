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
    let json1= JSON.stringify(categories);
    let json2= JSON.parse(json1);

    let sizeJson = json2.length;
    console.log("oi");
    for(let i =0; i < sizeJson; i++ ){
         
            sub.push({name: json2[i].name, id: json2[i].id});
    }
    console.log(sub);


    return sub;
  }

  async getCalc2(){
    return 'Hello World!';
  }

  async getCalc3(){
    return 'Hello World!';
  }

}
