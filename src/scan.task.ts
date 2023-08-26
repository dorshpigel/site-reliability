import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { AppService } from './app.service';

@Injectable()
export class ScanTask {
  constructor(private readonly appService: AppService) {}

  @Cron(CronExpression.EVERY_30_SECONDS) // Change the interval as per your requirements
  async runRoute() {
    try {
      const response = await this.appService.getResultsTask();
      console.log('Scheduled task result:', response);
    } catch (error) {
      console.error('Scheduled task error:', error.message);
    }
  }
}
