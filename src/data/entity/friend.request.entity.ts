

import { BaseEntity, Column, Entity, ManyToOne, OneToMany,JoinColumn, PrimaryGeneratedColumn, Unique } from "typeorm";
import { User } from "./user.entity";

@Entity({ name: 'tb_friend_request' })
@Unique(['toUser', 'fromUser'])
export class FriendRequest extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'friend_request_id' })
  friendId: number;

  @Column({ type: 'tinyint', name: 'is_friend', default: false })
  isFriend: boolean;

  @Column({
    type: 'timestamp',
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @ManyToOne((type) => User, {
    createForeignKeyConstraints: false,
    nullable: false,
  })
  @JoinColumn({ name: 'from_user', referencedColumnName: 'userId' })
  fromUser: User;

  @ManyToOne((type) => User, {
    createForeignKeyConstraints: false,
    nullable: false,
  })
  @JoinColumn({ name: 'to_user', referencedColumnName: 'userId' })
  toUser: User;

  @Column({ name: 'is_read', type: 'tinyint', default: false })
  isRead: boolean;

  @Column({ name: 'delete_at', type: 'timestamp', nullable: true })
  deleteAt: Date;
}