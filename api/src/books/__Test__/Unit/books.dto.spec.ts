import { validate } from 'class-validator';
import { CreateBookDto } from '../../inputs/create-book.dto';
import { faker } from '@faker-js/faker';

describe('CreateBookDto', () => {
    it('should pass validation with valid data', async () => {
        const bookData = {
            title: faker.internet.userName(),
            quantity_available: faker.number.int(),
            img: faker.image.url(),
            description: faker.lorem.text(),
            category_id: 1,
            author_id: 1,
        };

        const dto = new CreateBookDto();
        Object.assign(dto, bookData);

        const errors = await validate(dto);
        expect(errors.length).toBe(0);
    });

    it('should fail validation if title length is less than 3 characters', async () => {
        const bookData = {
            title: 'Bo',
            quantity_available: 10,
            img: faker.number.int(),
            description: faker.lorem.text(),
            category_id: 1,
            author_id: 1,
        };

        const dto = new CreateBookDto();
        Object.assign(dto, bookData);

        const errors = await validate(dto);
        expect(errors.length).toBeGreaterThan(0);
    });

    it('should fail validation if quantity_available is not provided', async () => {
        const bookData = {
            title: faker.internet.userName(),
            quantity_available: faker.number.int(),
            img: faker.image.url(),
            description: faker.lorem.text(),
            category_id: 1,
            author_id: 1,
        };

        const dto = new CreateBookDto();
        Object.assign(dto, bookData);

        const errors = await validate(dto);
        expect(errors.length).toBeGreaterThan(0);
    });

});
