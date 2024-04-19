import { IsInt, IsNotEmpty, IsString, IsUrl, Length } from "class-validator";

export class CreateBookDto {
    @Length(3)
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsInt()
    @IsNotEmpty()
    quantity_available: number;

    @IsString()
    @IsUrl()
    img: string;

    @IsString()
    description: string;

    @IsInt()
    @IsNotEmpty()
    category_id: number;

    @IsInt()
    @IsNotEmpty()
    author_id: number;
}
