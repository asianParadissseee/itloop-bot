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
  app.enableCors({
    origin: ['http://localhost:3000/', 'https://loop-school.vercel.app/'],
    allowedHeaders: 'Content-Type, Accept',
    credentials: true,
  });
  app.use(cors());
  await app.listen(PORT, () =>
    console.log(`server running on port http://localhost:${PORT}`),
  );
}
bootstrap();
