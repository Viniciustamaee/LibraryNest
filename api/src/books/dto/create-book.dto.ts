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

    category_id: number;

    author_id: number;
}
