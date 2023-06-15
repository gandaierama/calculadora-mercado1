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
@Module({
  imports: [
  ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
    }),
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
