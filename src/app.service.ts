import { Injectable } from '@nestjs/common';
import { DatabaseService } from './database/database.service';
import { SearchService } from './search/search.service';
import { Status } from './database/schemas/listResult.schema';
import InsertToListDto from './database/dto/insertToList.dto';
import InsertResultDto from './database/dto/insertResult.dto';
import { Logger } from '@nestjs/common/services';
import { Result } from './database/schemas/result.schema';

@Injectable()
export class AppService {
  constructor(
    private readonly dbService: DatabaseService,
    private readonly searchService: SearchService,
  ) {}

  private readonly logger = new Logger('app');

  //function to insert new url to queue list
  async insertToList(url: string): Promise<string> {
    const extractedDomain = this.extractDomain(url);
    if (extractedDomain === null) {
      return 'Not a valid domain,please try another';
    }

    const checkExistance = await this.dbService.scanList(extractedDomain);
    if (checkExistance !== null) {
      return 'Domain exists on list,will be updated on the next interval';
    }

    await this.dbService.insertToList({
      url: extractedDomain,
      status: Status.UNDONE,
    });

    return 'Domain added to list';
  }

  //extract domain function converts everything to ***.*** I.E stackoverflow.com
  extractDomain(url: string) {
    const regex = /^(?:https?:\/\/)?(?:www\.)?([a-zA-Z0-9.-]+)(?:\/|$)/;
    const match = url.match(regex);

    if (match && match[1]) {
      return match[1];
    }

    return null;
  }

  async getExistingResultsForDomain(url: string): Promise<Result | string> {
    const extractedDomain = this.extractDomain(url);
    if (extractedDomain === null) {
      return 'Not a valid domain,please try another';
    }

    const existingResult = await this.dbService.getResult(extractedDomain);
    if (existingResult === null) {
      await this.insertToList(extractedDomain);
      return 'Please check back later,the data is currently gathering';
    }

    return existingResult;
  }

  async getResultsTask() {
    const updatedDomains: string[] = [];
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const domainsToScan = await this.dbService.getListPerStatus(Status.UNDONE);
    const oldDomains = await this.dbService.getListWithFilter({
      status: Status.DONE,
      updatedAt: { $lt: thirtyDaysAgo },
    });

    for (const domain of domainsToScan) {
      try {
        const gatheredData = await Promise.all([
          await this.searchService.getDataFromWhoIs(domain.url),
          await this.searchService.getDataFromVirusTotal(domain.url),
        ]);
        this.logger.log('got data');
        const newResult: InsertResultDto = {
          url: domain.url,
          updatedAt: new Date(),
          whois_data: gatheredData[0].data ? gatheredData[0].data : {},
          virustotal_data: gatheredData[1].data ? gatheredData[1].data : {},
        };
        this.logger.log(`now inserting ${domain.url}`);
        await this.dbService.insertResult(newResult);
        await this.dbService.updateList({
          status: Status.DONE,
          updatedAt: new Date(),
          url: domain.url,
        });
        updatedDomains.push(domain.url);
      } catch (e) {
        this.logger.log(`there was an issue inserting this url: ${domain.url}`);
        this.logger.log(e.message)
        continue;
      }
    }

    for (const domain of oldDomains) {
      try {
        const gatheredData = await Promise.all([
          await this.searchService.getDataFromWhoIs(domain.url),
          await this.searchService.getDataFromVirusTotal(domain.url),
        ]);
        this.logger.log('got data');
        const updateResult: InsertResultDto = {
          url: domain.url,
          updatedAt: new Date(),
          whois_data: gatheredData[0].data ? gatheredData[0].data : {},
          virustotal_data: gatheredData[1].data ? gatheredData[1].data : {},
        };
        this.logger.log(`now inserting ${domain.url}`);
        await this.dbService.updateResult(updateResult);
        await this.dbService.updateList({
          status: Status.DONE,
          updatedAt: new Date(),
          url: domain.url,
        });
      } catch (e) {
        this.logger.log(`there was an issue inserting this url: ${domain.url}`);
        this.logger.log(e.message)
        continue;
      }
    }

    return `updated ${updatedDomains.length} domains`;
  }
}
