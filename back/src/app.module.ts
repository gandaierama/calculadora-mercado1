import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProdutosModule } from './produtos/produtos.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import * as dotenv from 'dotenv';
import { Produto } from './produtos/entities/produto.entity';
import { ScheduleModule } from '@nestjs/schedule';
import { PuppeteerModule } from 'nest-puppeteer';
@Module({
  imports: [
  PuppeteerModule.forRoot(
      { pipe: true }, // optional, any Puppeteer launch options here or leave empty for good defaults */,
      'Chrome', // optional, can be useful for using Chrome and Firefox in the same project
    ),
  ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '../doc/'),
      serveRoot: '/doc/' //last slash was important
    }),
  ScheduleModule.forRoot(),
  ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'database',
      port: 3306,
      username: 'root',
      password: 'test',
      database: 'db_main',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
  ProdutosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
