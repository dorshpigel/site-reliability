import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { HttpModule } from '@nestjs/axios';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [
    HttpModule,DatabaseModule
  ],
  providers: [SearchService],
})
export class SearchModule {}
