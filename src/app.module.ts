import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { SearchController } from './search/search.controller';
import { SearchModule } from './search/search.module';
import { SearchService } from './search/search.service';
import { ScanTask } from './scan.task';


@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    MongooseModule.forRoot(process.env.DB_URI),
    DatabaseModule,
    HttpModule,
    ScheduleModule.forRoot(),
    SearchModule,
  ],
  controllers: [AppController, SearchController],
  providers: [AppService, SearchService, ScanTask],
})
export class AppModule {}
