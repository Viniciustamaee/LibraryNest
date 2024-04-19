import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: 'user'
})

export class UserEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique: true
    })
    email: string;

    @Column({
        unique: true
    })
    username: string


    @Column({
        length: 255
    })
    password: string;

    @Column({
        type: "longtext"
    })
    img: string;


    @Column({
        type: "longtext"
    })
    description: string;

    @Column({
        type: 'enum',
        enum: [0, 1],
        default: 0
    })
    admin: 0 | 1;


}
