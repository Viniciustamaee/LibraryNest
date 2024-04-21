import { IsEmail, IsEmpty, IsEnum, IsNotEmpty, IsNumber, IsString, IsStrongPassword, IsUrl } from "class-validator";

export class CreateUserDto {

    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsString()
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

    img: string;

    @IsString()
    description: string;







}
