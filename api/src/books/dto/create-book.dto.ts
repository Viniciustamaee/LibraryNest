import { IsInt, IsNotEmpty, IsString, Length } from "class-validator";

export class CreateBookDto {
    @Length(3)
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    quantity_available: number;

    img: string;

    @IsString()
    description: string;

    @IsNotEmpty()
    category_id: number;

    @IsNotEmpty()
    author_id: number;
}
