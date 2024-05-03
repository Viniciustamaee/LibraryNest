import { IsNotEmpty, IsString, IsUrl, Length } from "class-validator";
import { Field, InputType } from "@nestjs/graphql";


@InputType()
export class inputBook {

    @Field()
    @Length(3)
    @IsString()
    @IsNotEmpty()
    title: string;

    @Field()
    @IsNotEmpty()
    quantity_available: number;

    @Field()
    @IsUrl()
    img: string;

    @Field()
    @IsString()
    description: string;

    @Field()
    category_id: number;

    @Field()
    author_id: number;
}
