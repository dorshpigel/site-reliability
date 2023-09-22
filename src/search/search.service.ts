import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { DatabaseService } from 'src/database/database.service';
import { firstValueFrom } from 'rxjs';
import { Logger } from '@nestjs/common/services';
import { Status } from 'src/database/schemas/listResult.schema';
import ProviderResponseDto from './dto/provider.response.dto';
import InsertResultDto from 'src/database/dto/insertResult.dto';
import { Result } from 'src/database/schemas/result.schema';
import { ListResult } from 'src/database/schemas/listResult.schema';

@Injectable()
export class SearchService {
  constructor(
    private readonly httpService: HttpService,
    private readonly dbService: DatabaseService,
  ) {}

  private readonly logger = new Logger('search');

  async getDataFromWhoIs(url: string): Promise<ProviderResponseDto> {
    try {
      this.validateUrl(url);
      const response = await this.httpService.get(
        `https://api.whoisfreaks.com/v1.0/whois?whois=live&domainName=${url}&apiKey=${process.env.WHOIS_TOKEN}`,
      );
      const responseData = await firstValueFrom(response);
      return {
        status: 200,
        data: responseData.data,
      };
    } catch (e) {
      if (e instanceof Error) {
        throw new Error({ error: e.name, message: e.message }.toString());
      }
    }
  }

  async getDataFromVirusTotal(url: string): Promise<ProviderResponseDto> {
    try {
      this.validateUrl(url);
      const response = await this.httpService.get(
        `https://www.virustotal.com/api/v3/domains/${url}`,
        {
          headers: { 'x-apikey': process.env.VIRUSTOTAL_TOKEN },
        },
      );
      const responseData = await firstValueFrom(response);
      return {
        status: 200,
        data: responseData.data,
      };
    } catch (e) {
      if (e instanceof Error) {
        throw new Error({ error: e.name, message: e.message }.toString());
      }
    }
  }

  validateUrl(url: string): void {
    if ((url && url.length < 1) || url === null || url === undefined) {
      throw new Error(`the url you've entered is blank`);
    }
    return;
  }

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
          typeof this.getDataFromWhoIs
        > | null>[] = [
          this.getDataFromWhoIs(domain.url).catch((error) => {
            console.error('Error from getDataFromWhoIs:', error);
            return null;
          }),
          this.getDataFromVirusTotal(domain.url).catch((error) => {
            console.error('Error from getDataFromVirusTotal:', error);
            return null;
          }),
        ];
        const [whoIsData, virusTotalData] = await Promise.all(promises);
        this.logger.log('got data');
        const newResult = {
          url: domain.url,
          updatedAt: new Date(),
          ...(whoIsData.data && { whois_data: whoIsData.data }),
          ...(virusTotalData.data && {
            virustotal_data: virusTotalData.data,
          }),
        } as InsertResultDto;
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
