import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Users {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    username: string

    @Column({select: false})
    password: string

    @Column({type: 'boolean', default: 1})
    isActive: boolean

    @CreateDateColumn({select: false})
    createdAt: Date

    @UpdateDateColumn({select: false})
    updatedAt: Date
}