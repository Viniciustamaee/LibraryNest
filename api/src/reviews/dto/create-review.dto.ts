import { IsInt, IsNotEmpty, Min, Max, IsString } from "class-validator";

export class CreateReviewDto {

    @IsInt()
    rating: number;

    @IsString()
    comment: string

    @IsInt()
    @IsNotEmpty()
    user_id: number;

    @IsInt()
    @IsNotEmpty()
    book_id: number;
}

