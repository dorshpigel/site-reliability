import { Controller, Post, Body, Query, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SearchService } from './search.service';
import URLDto from './dto/url.dto';

@ApiTags('search')
@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Post('insert-to-list')
  async insertToList(@Body() object: URLDto) {
    return await this.searchService.insertToList(object.url);
  }

  @Get('get-domain-data')
  async getResult(@Query('url') url: string) {
    return await this.searchService.getExistingResultsForDomain(url);
  }

  @Get('start-task')
  async startTask() {
    return await this.searchService.getResultsTask();
  }
}
