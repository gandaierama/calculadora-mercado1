import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProdutosService } from './produtos.service';


@Controller('produtos')
export class ProdutosController {
  constructor(private readonly produtosService: ProdutosService) {}



  @Get()
  findAll() {
    return this.produtosService.findAll();
  }


}
