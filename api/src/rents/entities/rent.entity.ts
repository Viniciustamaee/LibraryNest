import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "../../users/entities/user.entity";
import { BookEntity } from "../../books/entities/book.entity";

@Entity({
    name: 'rents'
})
export class RentEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
    })
    rented_date: string;

    @Column({
    })
    due_date: string;


    @ManyToOne(() => UserEntity)
    @JoinColumn({ name: 'user_id' })
    user: UserEntity

    @ManyToOne(() => BookEntity, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'book_id' })
    book: BookEntity

}
