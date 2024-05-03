import { Field, InputType } from "@nestjs/graphql";
import { IsDateString, IsNotEmpty, IsNumber } from "class-validator";

@InputType()
export class InputtRents {

    @Field()
    @IsNotEmpty()
    @IsDateString()
    rented_date: string;

    @Field()
    @IsNotEmpty()
    @IsDateString()
    due_date: string;

    @Field()
    @IsNumber()
    @IsNotEmpty()
    user_id: number;

    @Field()
    @IsNumber()
    @IsNotEmpty()
    book_id: number;


}
