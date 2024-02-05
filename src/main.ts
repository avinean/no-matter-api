import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  app.use((req, _, next) => {
    console.log(new Date(), `[${req.method}]`, req.url);
    next();
  });

  const options = new DocumentBuilder()
    .setTitle('API')
    .setDescription('API')
    .setVersion('1')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/swagger', app, document);

  await app.listen(5050);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
