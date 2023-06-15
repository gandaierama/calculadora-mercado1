
  import { Controller, Get, Param, Query , StreamableFile} from '@nestjs/common';
import { AppService } from './app.service';
import { createReadStream } from 'fs';
import { join } from 'path';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("script")
  getFile(): StreamableFile {
    const file = createReadStream(join(process.cwd(), 'package.json'));
    return new StreamableFile(file);
  }
  @Get("/calc")
  getCalc1(){
    return this.appService.getCalc1();
  }

  @Get("/calc2/:id")
  getCalc2(@Param() params: any) {
    console.log(params.id);
    return this.appService.getCalc2(params.id);
  }

  @Get("/calc3")
  getCalc3(@Query() params: any) {
    console.log(params);
    return this.appService.getCalc3(params);
  }


}