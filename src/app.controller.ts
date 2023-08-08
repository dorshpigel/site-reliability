import { Controller, Get, Body, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';
import URLDto from './search/dto/url.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('insert-to-list')
  async insertToList(@Body() object: URLDto) {
    return await this.appService.insertToList(object.url);
  }

  @Get('get-domain-data')
  async getResult(@Query('url') url: string) {
    return await this.appService.getExistingResultsForDomain(url);
  }

  @Get('start-task')
  async startTask() {
    return await this.appService.getResultsTask();
  }
}
