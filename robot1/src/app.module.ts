import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule } from '@nestjs/config';
import { ProdutosModule } from './produtos/produtos.module';
import { Produto } from './produtos/entities/produto.entity';
import { ProdutosService } from './produtos/produtos.service';
import * as dotenv from 'dotenv';
import {TypeOrmModule} from '@nestjs/typeorm';
@Module({
  imports: [
    ScheduleModule.forRoot(),
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
    TypeOrmModule.forFeature([
      Produto
    ]),
    ConfigModule.forRoot(),
    ProdutosModule,
  ],
  controllers: [AppController],
  providers: [AppService, ProdutosService],
})
export class AppModule {}
