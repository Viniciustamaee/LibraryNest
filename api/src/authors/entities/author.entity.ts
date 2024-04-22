import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: 'authors'
})
export class AuthorEntity {
    @PrimaryGeneratedColumn({
        type: "int"
    })
    id: number;

    @Column({
        unique: true,
        length: 143
    })
    name: string;
}
