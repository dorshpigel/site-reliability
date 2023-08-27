import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { SearchController } from './search/search.controller';
import { SearchModule } from './search/search.module';
import { SearchService } from './search/search.service';
import { ScanTask } from './scan.task';
import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

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
export class AppModule implements NestModule {
  constructor() {}

  configure(consumer: MiddlewareConsumer) {}

  static async createApp(): Promise<INestApplication> {
    const app = await NestFactory.create(AppModule);

    const config = new DocumentBuilder()
      .setTitle('NestJS Swagger Example')
      .setDescription('API documentation for NestJS application')
      .setVersion('1.0')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    return app;
  }
}
