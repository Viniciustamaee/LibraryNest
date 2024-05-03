
import { Field, ID, ObjectType } from "@nestjs/graphql";
import { BookEntity } from "src/books/entity/books.entity";
import { UserEntity } from "src/users/entity/users.entity";


@ObjectType()
export class ReviewType {

    @Field(() => ID)
    id: number;

    @Field()
    rating: number;


    @Field({ nullable: true })
    comment: string;

    @Field(() => UserEntity)
    user: UserEntity;

   
    @Field(() => BookEntity)
    book: BookEntity;
}
