import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { FriendModule } from './friend.module';
import { GlobalExceptionFilter } from './configs/global.exceptrionFilter';

async function bootstrap() {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    FriendModule,
    {
      transport: Transport.TCP,
      options: {
        port: 8102,
      }
    },
  );
  app.useGlobalFilters(new GlobalExceptionFilter);
  await app.listen();
}
bootstrap();
