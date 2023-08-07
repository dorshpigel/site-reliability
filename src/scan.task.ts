import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ScanTask {
  constructor(private httpService: HttpService) {}

  @Cron(CronExpression.EVERY_30_SECONDS) // Change the interval as per your requirements
  async runRoute() {
    try {
      const response = await this.httpService.get('http://localhost:3000/');
      console.log(
        'Scheduled task result:',
        (await firstValueFrom(response)).data,
      );
    } catch (error) {
      console.error('Scheduled task error:', error.message);
    }
  }
}
