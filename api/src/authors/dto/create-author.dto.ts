import { IsNotEmpty, IsString, Length } from "class-validator";

export class CreateAuthorDto {

    @IsString()
    name: string

}
