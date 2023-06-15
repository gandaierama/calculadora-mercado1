import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: false });

    const config = new DocumentBuilder()
    .setTitle('App Doc')
    .setDescription('Swagger test')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  app.useStaticAssets(path.join(__dirname, '/../doc'));
  SwaggerModule.setup('swagger', app, document);
  await app.listen(3000);
}
bootstrap();
