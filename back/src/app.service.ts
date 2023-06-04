import { Injectable } from '@nestjs/common';
import axios from 'axios';

import categories from '../categories.json';
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }



  async getCalc1(){

    var sub;

    




    return categories;
  }

  async getCalc2(){
    return 'Hello World!';
  }

  async getCalc3(){
    return 'Hello World!';
  }

}
