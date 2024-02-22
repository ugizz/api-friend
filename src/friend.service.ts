import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { FriendRepository } from './friend.repository';
import { FriendRequestRepository } from './friend.request.repository';
import { FriendRequestDto } from './dto/friend.request.dto';
import { User } from './entity/user.entity';
import { FriendRequest } from './entity/friend.request.entity';
import { FriendComplyDto } from './dto/friend.comply.dto';
import { Friend } from './entity/friend.entity';
import { Observable, lastValueFrom } from 'rxjs';
import { FriendListDto } from './dto/friend.list.dto';
import { FriendRequestListDto } from './dto/friend.request.list.dto';

@Injectable()
export class FriendService {
  constructor(
    private friendRequestRepository: FriendRequestRepository,
    @Inject('AUTH')
    private readonly authClient: ClientProxy,
    private friendRepository: FriendRepository,
  ) {}

  async friendRequest(
    friendRequestDto: FriendRequestDto,
  ): Promise<FriendRequest> {
    const { nickname, user } = friendRequestDto;
    console.log(nickname);

    const result = await lastValueFrom(
      this.authClient.send('checkNickname', nickname),
    );
    const { data } = result;
    const check = data.check;

    if (check) {
      throw new BadRequestException('해당 닉네임을 가진 유저가 없습니다.');
    }

    const user1 = user;
    const user2 = await lastValueFrom(
      this.authClient.send<User>('findNickname', nickname),
    );

    return this.friendRequestRepository.createFriend(user1, user2);
  }

  async friendCreate(friendComplyDto: FriendComplyDto): Promise<string> {
    const { friendRequestId } = friendComplyDto;

    const friendRequest = await this.friendRequestRepository.findOne({
      where: { friendId: friendRequestId },
      relations: {
        toUser: true,
        fromUser: true,
      },
    });
    await this.friendRequestRepository.update(friendRequestId, {
      isFriend: true,
    });
    await this.friendRepository.createFriend(friendRequest);

    return '친구요청이 수락되었습니다.';
  }

  async findFriendList(user: User): Promise<FriendListDto[]> {
    return await this.friendRepository.userFriend(user.userId);
  }

  async requestFriendList(user: User): Promise<FriendRequestListDto[]> {
    return await this.friendRequestRepository.findFromUser(user.userId);
  }

  async receivedFriendList(user: User): Promise<FriendRequestListDto[]> {
    return await this.friendRequestRepository.findToUser(user.userId);
  }

  async deleteFriendRequest(requestId: Number): Promise<void> {
    return await this.friendRequestRepository.deleteRequest(requestId);
  }
}