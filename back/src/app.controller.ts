
  import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }


  @Get("/calc")
  getCalc1(){
    return this.appService.getCalc1();
  }

  @Get("/calc2")
  getCalc2(@Param() params: any) {
    return this.appService.getCalc2(params);
  }
  @Get("/calc3")
  getCalc3(@Param() params: any) {
    return this.appService.getCalc3(params);
  }


}


