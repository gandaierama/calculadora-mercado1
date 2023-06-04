import { Injectable } from '@nestjs/common';
import axios from 'axios';
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }



  async getCalc1(){

    var sub;

    axios('./categories.json')
    .then((response) => {
      sub = response;
    });




    return sub;
  }

  async getCalc2(){
    return 'Hello World!';
  }

  async getCalc3(){
    return 'Hello World!';
  }

}
