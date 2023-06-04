import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }



  async getCalc1(){

    var sub;

    fetch('./categories.json')
    .then((response) => {
      sub = response.json();
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
