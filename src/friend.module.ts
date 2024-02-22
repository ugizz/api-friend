import { Module } from '@nestjs/common';
import { FriendService } from './friend.service';
import { FriendController } from './friend.controller';
import { typeORMConfig } from './configs/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Friend } from './entity/friend.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { FriendRepository } from './friend.repository';
import { FriendRequestRepository } from './friend.request.repository';

@Module({
  imports: [
      ClientsModule.register([
      {
        name: 'AUTH',
        transport: Transport.TCP,
        options: {port: 8101},
      }
    ]),
      TypeOrmModule.forRoot(typeORMConfig),
      TypeOrmModule.forFeature([Friend])
  ],
  controllers: [FriendController],
  providers: [FriendService, FriendRepository, FriendRequestRepository],

})
export class FriendModule {}
