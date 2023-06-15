import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProdutosModule } from './produtos/produtos.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';


@Module({
  imports: [
  ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
    }),
  ProdutosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
