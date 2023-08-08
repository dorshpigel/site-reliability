import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule,
  ],
  providers: [SearchService],
})
export class SearchModule {}
