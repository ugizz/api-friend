import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity({ name: 'tb_role' })
export class Role extends BaseEntity {
    @PrimaryGeneratedColumn({ name: "role_id" })
    roleId: number;

    @Column({ name: "role_name" })
    roleName: string;
}