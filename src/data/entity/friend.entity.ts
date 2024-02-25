
import { BaseEntity, Column, Entity, ManyToOne,JoinColumn, PrimaryGeneratedColumn, Unique, OneToOne } from "typeorm";
import { FriendRequest } from "./friend.request.entity";
import { User } from "./user.entity";

@Entity({ name: 'tb_friend' })
@Unique(['userId', 'friendId'])
export class Friend extends BaseEntity {
    @PrimaryGeneratedColumn({ name: "id" })
    id: number; 
    
    @ManyToOne(type => User, {createForeignKeyConstraints: false, nullable: false})
    @JoinColumn({ name: 'user_id', referencedColumnName: 'userId' })
    userId: User;

    @ManyToOne(type => User, {createForeignKeyConstraints: false, nullable: false})
    @JoinColumn({ name: 'friend_id', referencedColumnName: 'userId' })
    friendId: User;
 
    @OneToOne(type => FriendRequest, { createForeignKeyConstraints: false, nullable: false })
    @JoinColumn({ name: 'friend_request_id', referencedColumnName: 'friendId' })
    friendRequestId: FriendRequest;

    @Column({ type: 'timestamp', name : 'complyed_at',  default: () => 'CURRENT_TIMESTAMP' })
    complyedAt: Date;

}