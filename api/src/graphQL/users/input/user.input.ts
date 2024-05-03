import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, IsUrl } from "class-validator";
import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateUsersInput {

    @Field({ nullable: false })
    @IsEmail()
    @IsNotEmpty()
    email: string

    @Field({ nullable: false })
    @IsString()
    @IsNotEmpty()
    username: string

    @Field({ nullable: false })
    @IsNotEmpty()
    @IsStrongPassword({
        minNumbers: 2,
        minSymbols: 2,
        minUppercase: 1,
        minLowercase: 0,
        minLength: 5
    })
    password: string

    @Field()
    img: string;

    @Field({ nullable: false })
    @IsString()
    description: string;
}
