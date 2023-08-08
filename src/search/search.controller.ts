import { Controller, Post, Body } from '@nestjs/common';
import { SearchService } from './search.service';
import TestDto from './dto/url.dto';

@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}
}
