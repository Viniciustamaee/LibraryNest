import { IsDate, IsNotEmpty, IsNumber } from "class-validator";

export class CreateRentDto {

    @IsNotEmpty()
    rented_date: string;

    @IsNotEmpty()
    due_date: string;

    @IsNumber()
    @IsNotEmpty()
    user_id: number;

    @IsNumber()
    @IsNotEmpty()
    book_id: number;


}
