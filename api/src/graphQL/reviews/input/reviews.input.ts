import { Field, InputType } from "@nestjs/graphql";
import { IsInt, IsNotEmpty, Min, Max, IsString } from "class-validator";

@InputType()
export class InputReview {

    @IsInt()
    @IsNotEmpty()
    @Field()
    rating: number;

    @IsString()
    @Field({ nullable: true })
    comment: string

    @Field()
    @IsInt()
    @IsNotEmpty()
    user_id: number;

    @Field()
    @IsInt()
    @IsNotEmpty()
    book_id: number;
}

