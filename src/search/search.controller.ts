import { Controller, Post, Body, Query, Get } from '@nestjs/common';
import {
  ApiTags,
  ApiResponse,
  ApiBadRequestResponse,
  ApiQuery,
  ApiBody,
} from '@nestjs/swagger';
import { SearchService } from './search.service';
import URLDto from './dto/url.dto';
import { Result } from 'src/database/schemas/result.schema';

@ApiTags('search')
@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @ApiBody({
    type: URLDto,
    description: 'Body containing a url property',
    required: true,
  })
  @ApiResponse({
    status: 200,
    description:
      'Returns a message regarding the insertion of the url into the existing list',
    type: String,
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @Post('insert-to-list')
  async insertToList(@Body() object: URLDto) {
    return await this.searchService.insertToList(object.url);
  }

  @Get('get-domain-data')
  @ApiQuery({
    type: String,
    description: 'Url of result - ?url=www.cnn.com',
    required: true,
  })
  @ApiResponse({
    status: 200,
    description:
      'Returns a result for a given domain or a message that the result will be available after the next interval',
    type: Result || String,
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async getResult(@Query('url') url: string): Promise<string | Result> {
    return await this.searchService.getExistingResultsForDomain(url);
  }

  @ApiResponse({
    status: 200,
    description:
      'Returns a message containing the number of updated objects on this interval',
    type: String,
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @Get('start-task')
  async startTask(): Promise<string> {
    return await this.searchService.getResultsTask();
  }
}
