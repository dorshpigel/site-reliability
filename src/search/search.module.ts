import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SearchService } from './search.service';
import { DatabaseService } from './database.service';
import { HttpModule } from '@nestjs/axios';
import { ResultSchema } from './schemas/result.schema';
import { ListResultSchema } from './schemas/listResult.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Result', schema: ResultSchema },
      { name: 'ListResult', schema: ListResultSchema },
    ]),
    HttpModule,
  ],
  providers: [SearchService, DatabaseService],
})
export class SearchModule {}
