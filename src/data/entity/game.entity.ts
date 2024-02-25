import { BaseEntity, Column, Entity, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./role.entity";
import { User } from "./user.entity";


@Entity({ name: 'tb_game_result' })
export class Game extends BaseEntity {
    @PrimaryGeneratedColumn({ name: "result_id" })
    gameId: number;

    @Column({name: 'user_session'})
    userSession: string

    @Column({name: 'room_session'})
    roomSession: string

    @ManyToOne(type => User, {createForeignKeyConstraints: false, nullable: false})
    @JoinColumn({ name: 'user_id', referencedColumnName: 'userId' }) 
    userId: User;

    @ManyToOne(type => Role, {createForeignKeyConstraints: false, nullable: false})
    @JoinColumn({ name: 'role_id', referencedColumnName: 'roleId' }) 
    roleId: Role;

    @Column({ type: 'tinyint', name: 'is_win' })
    isWin: boolean;

    @Column({ type: 'timestamp', name: 'played_at', default: () => 'CURRENT_TIMESTAMP' })
    playedAt: Date;
}