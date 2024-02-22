import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { FriendModule } from './friend.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    FriendModule,
    {
      transport: Transport.TCP,
      options: {
        port: 8102,
      },
    },
  );
  await app.listen();
}
bootstrap();
