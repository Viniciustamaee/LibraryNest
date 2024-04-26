import { IsDateString, IsNotEmpty, IsNumber } from "class-validator";

export class CreateRentDto {

    @IsNotEmpty()
    @IsDateString()
    rented_date: string;

    @IsNotEmpty()
    @IsDateString()
    due_date: string;

    @IsNumber()
    @IsNotEmpty()
    user_id: number;

    @IsNumber()
    @IsNotEmpty()
    book_id: number;


}
