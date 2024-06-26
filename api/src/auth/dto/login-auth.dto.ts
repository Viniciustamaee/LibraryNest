import { IsEmail, IsNotEmpty, IsStrongPassword } from "class-validator";

export class AuthLoginDTO{

    @IsNotEmpty()
    username: string


    @IsNotEmpty()
    @IsStrongPassword({
        minNumbers: 2,
        minSymbols: 2,
        minUppercase: 1,
        minLowercase: 0,
        minLength: 5
    })
    password: string
}