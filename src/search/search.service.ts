import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class SearchService {
  constructor(private httpService: HttpService) {}

  async getDataFromWhoIs(url: string) {
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

  async getDataFromVirusTotal(url: string) {
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

  validateUrl(url: string) {
    if ((url && url.length < 1) || url === null || url === undefined) {
      throw new Error(`the url you've entered is blank`);
    }
    return;
  }
}
