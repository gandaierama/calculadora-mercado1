import { Controller, Get } from '@nestjs/common';
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
  getCalc2() {
    return this.appService.getCalc2();
  }

  @Get("/calc3")
  getCalc3() {
    return this.appService.getCalc3();
  }


}
