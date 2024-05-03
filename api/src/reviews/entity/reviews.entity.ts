import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Field, ID, ObjectType } from "@nestjs/graphql";
import { BookEntity } from "src/books/entity/books.entity";
import { UserEntity } from "src/users/entity/users.entity";

@Entity({
    name: 'reviews'
})
@ObjectType()
export class ReviewEntity {

    @PrimaryGeneratedColumn()
    @Field(() => ID)
    id: number;

    @Column()
    @Field()
    rating: number;

    @Column({
        type: "longtext"
    })
    @Field({ nullable: true })
    comment: string;

    @ManyToOne(() => UserEntity, { nullable: false })
    @JoinColumn({ name: 'user_id' })
    @Field(() => UserEntity)
    user: UserEntity;

    @ManyToOne(() => BookEntity, { onDelete: 'CASCADE', nullable: false })
    @JoinColumn({ name: 'book_id' })
    @Field(() => BookEntity)
    book: BookEntity;
}
