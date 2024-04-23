import { IsNotEmpty, IsString, Length } from "class-validator";

export class CreateCategoryDto {
    @IsString()
    @IsNotEmpty()
    category_name: string
}
