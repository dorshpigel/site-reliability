import { Injectable } from '@nestjs/common';
import { DatabaseService } from './database/database.service';
import { SearchService } from './search/search.service';
import { ListResult, Status } from './database/schemas/listResult.schema';
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

    const allDomains: ListResult[] = await this.dbService.getListWithFilter({
      $or: [
        {
          status: Status.DONE,
          updatedAt: { $lt: thirtyDaysAgo },
        },
        {
          status: Status.UNDONE,
        },
      ],
    });

    for (const domain of allDomains) {
      try {
        const promises: Promise<ReturnType<
          typeof this.searchService.getDataFromWhoIs
        > | null>[] = [
          this.searchService.getDataFromWhoIs(domain.url).catch((error) => {
            console.error('Error from getDataFromWhoIs:', error);
            return null;
          }),
          this.searchService
            .getDataFromVirusTotal(domain.url)
            .catch((error) => {
              console.error('Error from getDataFromVirusTotal:', error);
              return null;
            }),
        ];
        const gatheredData = await Promise.all(promises);
        this.logger.log('got data');
        const newResult: InsertResultDto = {
          url: domain.url,
          updatedAt: new Date(),
          ...(gatheredData[0].data && { whois_data: gatheredData[0].data }),
          ...(gatheredData[1].data && {
            virustotal_data: gatheredData[1].data,
          }),
        };
        this.logger.log(`now inserting ${domain.url}`);
        switch (domain.status) {
          case Status.UNDONE: {
            await this.dbService.insertResult(newResult);
            break;
          }
          case Status.DONE: {
            await this.dbService.updateResult(newResult);
            break;
          }
          default:
            break;
        }
        await this.dbService.updateList({
          status: Status.DONE,
          updatedAt: new Date(),
          url: domain.url,
        });
        updatedDomains.push(domain.url);
      } catch (e) {
        this.logger.log(`there was an issue inserting this url: ${domain.url}`);
        this.logger.log(e.message);
        continue;
      }
    }

    return `updated ${updatedDomains.length} domains`;
  }
}
