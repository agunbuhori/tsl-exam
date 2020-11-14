import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Users {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column({
        type: 'char',
        length: 16,
        nullable: true
    })
    number: string

    @Column({
        nullable: true
    })
    domicilie: string

    @Column({nullable: true, type: 'char', length: 10})
    nip: string

    @Column({nullable: true})
    email: string

    @Column({nullable: true, select: false})
    password: string

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date
}