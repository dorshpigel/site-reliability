import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { AppService } from './app.service';

@Injectable()
export class ScanTask {
  constructor(private readonly appService: AppService) {}

  @Cron(CronExpression.EVERY_1ST_DAY_OF_MONTH_AT_MIDNIGHT) // Change the interval as per your requirements
  async runRoute() {
    try {
      const response = await this.appService.getResultsTask();
      console.log('Scheduled task result:', response);
    } catch (error) {
      console.error('Scheduled task error:', error.message);
    }
  }
}
