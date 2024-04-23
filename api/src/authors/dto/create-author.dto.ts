import { IsNotEmpty, IsString, Length, MinLength } from "class-validator";

export class CreateAuthorDto {

    @IsNotEmpty()
    @IsString()
    name: string

}
