import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { SearchService } from './search/search.service';

@Injectable()
export class ScanTask {
  constructor(private readonly searchService:SearchService) {}

  @Cron(CronExpression.EVERY_30_SECONDS) // Change the interval as per your requirements
  async runRoute() {
    try {
      const response = await this.searchService.getResultsTask();
      console.log('Scheduled task result:', response);
    } catch (error) {
      console.error('Scheduled task error:', error.message);
    }
  }
}
