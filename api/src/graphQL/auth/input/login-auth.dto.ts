import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty, IsStrongPassword } from "class-validator";

@InputType()
export class AuthLoginDTO{

    @IsNotEmpty()
    @Field()
    username: string


    @IsNotEmpty()
    @Field()
    @IsStrongPassword({
        minNumbers: 2,
        minSymbols: 2,
        minUppercase: 1,
        minLowercase: 0,
        minLength: 5
    })
    password: string
}