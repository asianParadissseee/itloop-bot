import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as process from 'process';
import * as cors from 'cors';
import { configDotenv } from 'dotenv';
async function bootstrap() {
  configDotenv();
  const app = await NestFactory.create(AppModule, {
    cors: false,
  });
  const PORT = process.env.PORT || 5050;
  console.log('это бля bot token ', process.env.BOT_TOKEN);
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept',
  });
  app.use(cors());
  await app.listen(PORT, () =>
    console.log(`server running on port http://localhost:${PORT}`),
  );
}
bootstrap();
