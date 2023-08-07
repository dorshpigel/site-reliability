import { Controller, Post, Body } from '@nestjs/common';
import { SearchService } from './search.service';
import TestDto from './dto/test.dto';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Post('test/whois')
  async getWhoisTest(@Body() testDto: TestDto) {
    return await this.searchService.getDataFromWhoIs(testDto.url);
  }

  @Post('test/virustotal')
  async getVirusTotalTest(@Body() testDto: TestDto) {
    return await this.searchService.getDataFromVirusTotal(testDto.url);
  }
}
