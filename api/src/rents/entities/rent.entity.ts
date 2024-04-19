import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "src/users/entities/user.entity";
import { BookEntity } from "src/books/entities/book.entity";
@Entity({
    name: 'rents'
})
export class RentEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'date'
    })
    rented_date: Date;

    @Column({
        type: 'date'
    })
    due_date: Date;


    @ManyToOne(() => UserEntity)
    @JoinColumn({ name: 'user_id' })
    user: UserEntity


    @ManyToOne(() => BookEntity, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'book_id' })
    book: BookEntity

}
