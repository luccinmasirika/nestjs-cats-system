import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');

  // swagger setup
  const config = new DocumentBuilder()
    .setTitle('Cats System Documentation')
    .setDescription('Cats System API')
    .setVersion('1.0.0')
    .addTag('Home')
    .addTag('Cats')
    .addTag('Owners')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/v1/docs', app, document);

  await app.listen(process.env.PORT || 9000);
}
bootstrap();
