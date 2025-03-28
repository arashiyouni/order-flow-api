import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { httpResponse } from './common/interface/https-commons.interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  async getHello() {
    const fn = async () => {
      return this.appService.getHello()
    }
    return await httpResponse(fn);
  }
}
