import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { Produto } from './produtos/entities/produto.entity';
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
         
            sub.push({name: json2[i].name, id: json2[i].id});
    }


    sub1= await JSON.stringify({data:sub});
    console.log(sub1);


    return sub1;
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
      console.log(json2[i].id);
            if(json2[i].id==id){
              sub.push(json2[i].children);
            }
            
    }
    console.log(sub);

    sub1= JSON.stringify(sub);
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
