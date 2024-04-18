import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: 'authors'
})
export class AuthorEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 255,
        unique: true
    })
    name: string;
}
