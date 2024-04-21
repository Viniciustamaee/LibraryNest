import { IsInt, IsNotEmpty, IsString, Length } from "class-validator";

export class CreateBookDto {
    @Length(3)
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsInt()
    @IsNotEmpty()
    quantity_available: number;

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
