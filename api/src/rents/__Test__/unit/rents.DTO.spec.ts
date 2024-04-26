import { faker } from "@faker-js/faker"
import { CreateRentDto } from "../../dto/create-rent.dto"
import { validate } from "class-validator"

describe('Validation DTO', () => {
    it('Create the rent', async () => {
        const rentData = {
            rented_date: faker.date.recent().toISOString(),
            due_data: faker.date.recent().toISOString(),
            user_id: 1,
            book_id: 1
        }
        const errors = await validate(rentData);

        expect(errors.length).toEqual(0);
    })

    it('should fail validation with an empty due_date and rented_date', async () => {
        const createAuthorDto = new CreateRentDto();
        createAuthorDto.due_date = ''
        createAuthorDto.rented_date = ''

        const errors = await validate(createAuthorDto);

        expect(errors.length).toBeGreaterThan(0);
        expect(errors[0].constraints).toHaveProperty('isNotEmpty');
    });
})