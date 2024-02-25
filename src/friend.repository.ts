import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Friend } from './data/entity/friend.entity';
import { FriendRequest } from './data/entity/friend.request.entity';
import { FriendListDto } from './data/dto/response/friend.list.dto';

@Injectable()
export class FriendRepository extends Repository<Friend> {
  constructor(dataSource: DataSource) {
    super(Friend, dataSource.createEntityManager());
  }

  async createFriend(requestId: FriendRequest): Promise<void> {
    const Friend1 = this.create({
      userId: requestId.toUser,
      friendId: requestId.fromUser,
      friendRequestId: requestId,
    });

    const Friend2 = this.create({
      userId: requestId.fromUser,
      friendId: requestId.toUser,
      friendRequestId: requestId,
    });

    await this.save([Friend1, Friend2]);
  }

  async userFriend(userId: number): Promise<FriendListDto[]> {
    const friendList = await this.createQueryBuilder('tb_friend')
      .select([
        'id',
        'complyed_at',
        'friend_request_id',
        'tb_user.nickname AS friend_nickname',
      ])
      .innerJoin(
        'tb_friend.friendId',
        'tb_user',
        'tb_friend.friend_id = tb_user.user_id',
      )
      .where('tb_friend.user_id = :user', { user: userId })
      .execute();

    return friendList;
  }
}
