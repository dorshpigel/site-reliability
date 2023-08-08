import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseService } from './database.service';
import { ResultSchema } from '../database/schemas/result.schema';
import { ListResultSchema } from '../database/schemas/listResult.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Result', schema: ResultSchema },
      { name: 'ListResult', schema: ListResultSchema },
    ]),
  ],
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule {}
