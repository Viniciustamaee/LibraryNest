
import { Field, ID, ObjectType } from "@nestjs/graphql";
import { BookEntity } from "src/books/entity/books.entity";
import { UserEntity } from "src/users/entity/users.entity";


@ObjectType()
export class RentEntity {
    @Field(() => ID)
    id: number;

    @Field()
    rented_date: string;

    @Field()
    due_date: string;

    @Field(() => UserEntity)
    user: UserEntity

    @Field(() => BookEntity)
    book: BookEntity

}
