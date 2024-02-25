
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity({ name: 'tb_user' })
export class User extends BaseEntity {

    @PrimaryGeneratedColumn({ name:'user_id'})
    userId: number;

    @Column({nullable: true, unique:true})
    address: string;

    @Column({nullable: true})
    passwd: string;

    @Column({nullable: true, unique:true})
    email: string;

    @Column({nullable: true})
    salt: string;

    @Column({nullable: true, unique:true})
    nickname: string;

    @Column({name: 'refresh_token', nullable: true})
    refreshToken: string;

    @Column({ type: 'timestamp', name: 'create_at', nullable: true, default: () => 'CURRENT_TIMESTAMP' })
    createAt: Date;

    @Column({ type: 'datetime', nullable:true, name: 'last_login' })
    lastLogin: Date;
    
    @Column({nullable: true, name: 'guest_id', unique:true})
    guestId: string;


}