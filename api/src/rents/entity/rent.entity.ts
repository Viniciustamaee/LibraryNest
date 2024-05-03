import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { Field, ID, ObjectType } from "@nestjs/graphql";
import { BookEntity } from "src/books/entity/books.entity";
import { UserEntity } from "src/users/entity/users.entity";

@Entity({
    name: 'rents'
})
@ObjectType()
export class RentEntity {
    @PrimaryGeneratedColumn()
    @Field(() => ID)
    id: number;

    @Column({})
    @Field()
    rented_date: string;

    @Column({})
    @Field()
    due_date: string;

    @Field(() => UserEntity)
    @ManyToOne(() => UserEntity)
    @JoinColumn({ name: 'user_id' })
    user: UserEntity

    @Field(() => BookEntity)
    @ManyToOne(() => BookEntity, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'book_id' })
    book: BookEntity

}
