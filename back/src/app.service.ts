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
    let json1= await JSON.stringify(categories);
    let json2= await JSON.parse(json1);

    let sizeJson = json2.length;

    for(let i =0; i < sizeJson; i++ ){
         
            sub.push({name: json2[i].name, id: json2[i].id, children: json2[i].children});
    }
    console.log(sub);

    sub1= await JSON.stringify(sub);
    console.log(sub1);
    const res={data:sub1};

    return res;
  }

  async getCalc2(params){
    console.log(params);
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
    console.log(sub);

    sub1= JSON.stringify(sub);
    return sub1;
  }



  async getCalc3(params){
    console.log(params);
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
    console.log(sub);

    sub1= JSON.stringify(sub);
    return sub1;
  }

  

}
