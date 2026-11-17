import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filters/http-exception.filter.js';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
   app.useGlobalPipes(
    new ValidationPipe({
      transform:true,
      whitelist:true,
      forbidNonWhitelisted:true,
    }),
  );

    const config = new DocumentBuilder()
    .setTitle("E-Commerce-Management-System")
    .setDescription("Project-Test")
    .setVersion('1.0')
    .build();
    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup("api-docs", app, document);

    
  await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();
