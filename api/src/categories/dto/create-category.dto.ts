import { IsNotEmpty, IsString, Length } from "class-validator";

export class CreateCategoryDto {
    @IsString()
    @IsNotEmpty()
    @Length(3)
    category_name: string
}
