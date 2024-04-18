import { IsNotEmpty, IsString, Length } from "class-validator";

export class CreateAuthorDto {

    @IsNotEmpty()
    @IsString()
    @Length(3)
    name: string

}
