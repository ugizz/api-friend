import { User } from 'src/data/entity/user.entity';

export class FriendRequestDto {
  nickname: string;

  user: User;
}
