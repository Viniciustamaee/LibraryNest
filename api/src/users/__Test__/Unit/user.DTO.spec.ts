import { validate } from "class-validator";
import { CreateUserDto } from "../../inputs/create-user.dto";
import { faker } from "@faker-js/faker";

describe('DTO validation', () => {
    it('Should pass validation', async () => {
        const createUserDto = new CreateUserDto();
        createUserDto.email = faker.internet.email()
        createUserDto.username = faker.internet.userName();
        createUserDto.password = '12!@A';
        createUserDto.description = faker.lorem.text()
        createUserDto.img = faker.image.url()

        const errors = await validate(createUserDto);
        expect(errors.length).toEqual(0)
    })

    it('should fail validation with an invalid email', async () => {
        const createUserDto = new CreateUserDto();
        createUserDto.email = 'invalid-email';

        const errors = await validate(createUserDto);

        expect(errors.length).toBeGreaterThan(0);
        expect(errors[0].constraints).toHaveProperty('isEmail');
    });

    it('should fail validation with an invalid username', async () => {
        const createUserDto = new CreateUserDto();
        createUserDto.username = '';

        const errors = await validate(createUserDto);

        expect(errors.length).toBeGreaterThan(0);
        expect(errors[0].constraints).toHaveProperty('isNotEmpty');
    });

    it('should fail validation with an invalid password', async () => {
        const createUserDto = new CreateUserDto();
        createUserDto.password = ''
        const errors = await validate(createUserDto);

        expect(errors.length).toBeGreaterThan(0);
        expect(errors[0].constraints).toHaveProperty('isNotEmpty');
    })
    it('should fail validation with a weak password', async () => {
        const createUserDto = new CreateUserDto();
        createUserDto.password = '123';

        const errors = await validate(createUserDto);

        expect(errors.length).toBeGreaterThan(0);

        expect(errors[2].constraints).toHaveProperty('isStrongPassword');
    });
})