import { IsNotEmpty, IsString, Length, MinLength } from "class-validator";

export class CreateAuthorDto {

    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    name: string

}
