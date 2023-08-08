import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import ProviderResponseDto from './dto/provider.response.dto';
import { Logger } from '@nestjs/common/services';


@Injectable()
export class SearchService {
  constructor(private readonly httpService: HttpService) {}

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
}
