import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remove propriedades não definidas no DTO
      forbidNonWhitelisted: true, // Lança erro se enviar campos não permitidos
      transform: true, // Transforma os dados recebidos para as classes DTO
    }),
  );

  // Configuração do Swagger
  const config = new DocumentBuilder()
    .setTitle('API Clothing')
    .setDescription('Api ecomerce de loja de roupas')
    .setVersion('1.0')
    .addBearerAuth() // Adiciona suporte para autenticação Bearer
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
