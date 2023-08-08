import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Logger } from '@nestjs/common/services';
import { Result } from './schemas/result.schema';
import { ListResult, Status } from './schemas/listResult.schema';
import InsertToListDto from './dto/insertToList.dto';
import InsertResultDto from './dto/insertResult.dto';

@Injectable()
export class DatabaseService {
  constructor(
    @InjectModel(Result.name)
    private resultModel: mongoose.Model<Result>,
    @InjectModel(ListResult.name)
    private listResultModel: mongoose.Model<ListResult>,
  ) {}

  private readonly logger = new Logger('db');

  async insertToList(object: InsertToListDto): Promise<ListResult | string> {
    try {
      const newRecord: InsertToListDto = {
        url: object.url,
        status: object.status,
        updatedAt: object.updatedAt ? object.updatedAt : new Date(),
      };
      const insert = await this.listResultModel.create(newRecord);
      return insert;
    } catch (e) {
      if (e.code === 11000 && e.keyValue && e.keyValue.url) {
        return 'Record already exists';
      } else {
        throw new Error(e.message);
      }
    }
  }

  async scanList(url: string): Promise<ListResult> {
    const listResult = await this.listResultModel.findOne({ url: url });
    return listResult;
  }

  async getListPerStatus(status: Status): Promise<ListResult[]> {
    const listResults = await this.listResultModel.find({ status: status });
    return listResults;
  }

  async getListWithFilter(filter: {}): Promise<ListResult[]> {
    const listResult = await this.listResultModel.find(filter);
    return listResult;
  }

  async getAllList(): Promise<ListResult[]> {
    const list = await this.listResultModel.find();
    return list;
  }

  async updateList(object: InsertToListDto): Promise<ListResult | string> {
    try {
      const updateRecord: InsertToListDto = {
        url: object.url,
        status: object.status,
        updatedAt: object.updatedAt ? object.updatedAt : new Date(),
      };
      const update = await this.listResultModel.findOneAndUpdate(
        { url: object.url },
        updateRecord,
      );
      return update;
    } catch (e) {
      if (e.code === 11000 && e.keyValue && e.keyValue.url) {
        return 'Record does not exists';
      } else {
        throw new Error(e.message);
      }
    }
  }

  async insertResult(object: InsertResultDto): Promise<Result | string> {
    try {
      const insertRecord: InsertResultDto = {
        url: object.url,
        updatedAt: object.updatedAt ? object.updatedAt : new Date(),
        whois_data: object.whois_data,
        virustotal_data: object.virustotal_data,
      };
      const insert = await this.resultModel.create(insertRecord);
      return insert;
    } catch (e) {
      if (e.code === 11000 && e.keyValue && e.keyValue.url) {
        return 'Record already exists';
      } else {
        throw new Error(e.message);
      }
    }
  }

  async getResult(url: string): Promise<Result> {
    const result = await this.resultModel.findOne({ url: url });
    return result;
  }

  async updateResult(object: InsertResultDto) {
    try {
      const updateRecord: InsertResultDto = {
        url: object.url,
        updatedAt: object.updatedAt ? object.updatedAt : new Date(),
        whois_data: object.whois_data,
        virustotal_data: object.virustotal_data,
      };
      const update = await this.resultModel.findOneAndUpdate(
        { url: object.url },
        updateRecord,
      );
      return update;
    } catch (e) {
      if (e.code === 11000 && e.keyValue && e.keyValue.url) {
        return 'Record does not exists';
      } else {
        throw new Error(e.message);
      }
    }
  }
}
