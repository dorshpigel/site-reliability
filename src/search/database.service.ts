import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Result } from './schemas/result.schema';
import { ListResult } from './schemas/listResult.schema';

@Injectable()
export class DatabaseService {
  constructor(
    @InjectModel(Result.name)
    private resultModel: mongoose.Model<Result>,
    @InjectModel(ListResult.name)
    private listResultModel: mongoose.Model<ListResult>,
  ) {}


  async insertToList() {}

  async insertResult() {}

  async scanForResult() {}

  async getResult() {}
}
