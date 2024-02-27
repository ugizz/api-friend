import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { FriendRequest } from './data/entity/friend.request.entity';
import { User } from './data/entity/user.entity';
import { FriendRequestListDto } from './data/dto/response/friend.request.list.dto';

@Injectable()
export class FriendRequestRepository extends Repository<FriendRequest> {
  constructor(dataSource: DataSource) {
    super(FriendRequest, dataSource.createEntityManager());
  }

  async createFriend(fromUser: User, toUser: User): Promise<any> {
    const resultId = await this.createQueryBuilder()
      .insert()
      .values({
        fromUser: fromUser,
        toUser: toUser,
      })
      .execute();
    const id = resultId.identifiers[0].friendId;

    const select = await this.createQueryBuilder()
      .select([
        'friend_request_id',
        'from_user',
        'to_user',
        'is_friend',
        'created_at',
        'is_read',
      ])
      .where('friend_request_id = :id', { id: id })
      .execute();
    return select[0];
  }

  async findToUser(userId: number): Promise<FriendRequestListDto[]> {
    return await this.createQueryBuilder('tb_friend_request')
      .select([
        'friend_request_id',
        'tb_user.nickname AS friend_nickname',
        'is_friend',
        'created_at',
        'is_read',
      ])
      .innerJoin(
        'tb_friend_request.fromUser',
        'tb_user',
        'tb_friend_request.from_user = tb_user.user_id',
      )
      .where('tb_friend_request.to_user = :userId', { userId: userId })
      .andWhere('tb_friend_request.delete_at IS NULL')
      .execute();
  }

  async findFromUser(userId: number): Promise<FriendRequestListDto[]> {
    return await this.createQueryBuilder('tb_friend_request')
      .select([
        'friend_request_id',
        'tb_user.nickname AS friend_nickname',
        'is_friend',
        'created_at',
        'is_read',
      ])
      .innerJoin(
        'tb_friend_request.toUser',
        'tb_user',
        'tb_friend_request.to_user = tb_user.user_id',
      )
      .where('tb_friend_request.from_user = :userId', { userId: userId })
      .andWhere('tb_friend_request.delete_at IS NULL')
      .execute();
  }

  async deleteRequest(requestId: number): Promise<void> {
    await this.createQueryBuilder()
      .update()
      .set({ deleteAt: () => 'CURRENT_TIMESTAMP' })
      .where('friend_request_id = :requestId', { requestId: requestId })
      .execute();
  }
}
