import { Column, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { BookEntity } from "src/books/entities/book.entity";
import { UserEntity } from "src/users/entities/user.entity";
export class ReviewEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    rating: number;

    @ManyToOne(() => UserEntity)
    @JoinColumn({ name: 'user_id' })

    user: UserEntity


    @ManyToOne(() => BookEntity, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'book_id' })
    book: BookEntity
}
