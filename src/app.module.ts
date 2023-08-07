import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SearchController } from './search/search.controller';
import { SearchModule } from './search/search.module';
import { ScanTask } from './scan.task';
import { SearchService } from './search/search.service';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    MongooseModule.forRoot(process.env.DB_URI),
    HttpModule,
    ScheduleModule.forRoot(),
    SearchModule,
  ],
  controllers: [AppController, SearchController],
  providers: [AppService, SearchService, ScanTask],
})
export class AppModule {}
