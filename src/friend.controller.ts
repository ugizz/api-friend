import { Controller, Get } from '@nestjs/common';
import { FriendService } from './friend.service';
import { MessagePattern } from '@nestjs/microservices';
import { FriendRequestDto } from './data/dto/request/friend.request.dto';
import { ResponseEntity } from './configs/ResponseEntity';
import { FriendRequest } from './data/entity/friend.request.entity';
import { FriendComplyDto } from './data/dto/request/friend.comply.dto';
import { User } from './data/entity/user.entity';
import { Friend } from './data/entity/friend.entity';
import { FriendListDto } from './data/dto/response/friend.list.dto';
import { FriendRequestListDto } from './data/dto/response/friend.request.list.dto';

@Controller()
export class FriendController {
  constructor(private readonly friendService: FriendService) {}

  // 친구요청
  @MessagePattern('request')
  async request(
    friendRequestDto: FriendRequestDto,
  ): Promise<ResponseEntity<string>> {
    return ResponseEntity.OK_WITH(
      await this.friendService.friendRequest(friendRequestDto),
    );
  }

  // 친구 요청 수락
  @MessagePattern('comply')
  async comply(
    friendComplyDto: FriendComplyDto,
  ): Promise<ResponseEntity<string>> {
    await this.friendService.friendCreate(friendComplyDto);
    return ResponseEntity.OK();
  }

  // 친구 목록 조회
  @MessagePattern('getFriendsList')
  async getFriendsList(user: User): Promise<ResponseEntity<FriendListDto[]>> {
    return ResponseEntity.OK_WITH(
      await this.friendService.findFriendList(user),
    );
  }

  // 친구 신청 목록 조회
  @MessagePattern('requestFriend')
  async requestFriend(
    user: User,
  ): Promise<ResponseEntity<FriendRequestListDto[]>> {
    return ResponseEntity.OK_WITH(
      await this.friendService.requestFriendList(user),
    );
  }

  // 친구 신청 받은 목록 조회
  @MessagePattern('receviedFriend')
  async receviedFriend(
    user: User,
  ): Promise<ResponseEntity<FriendRequestListDto[]>> {
    return ResponseEntity.OK_WITH(
      await this.friendService.receivedFriendList(user),
    );
  }

  // 친구 신청 거절
  @MessagePattern('requestRejct')
  async requestRejct(friendRequestId: number): Promise<ResponseEntity<string>> {
    await this.friendService.deleteFriendRequest(friendRequestId);
    return ResponseEntity.OK();
  }
}
