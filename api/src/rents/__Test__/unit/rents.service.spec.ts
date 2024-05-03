import { Test, TestingModule } from "@nestjs/testing";
import { RentEntity } from "../../entity/rent.entity";
import { CreateRentDto } from "../../../graphQL/rents/inputs/create-rent.dto";
import { faker } from "@faker-js/faker";
import { RentsService } from "../../rents.service";
import { BooksService } from "../../../books/books.service";
import { UsersService } from "../../../users/users.service";
import { mock } from "node:test";
import { BadRequestException, NotFoundException } from "@nestjs/common";

let rentsService: RentsService;
let booksService: BooksService;
let usersService: UsersService;

const mockBooksService = {
    existing: jest.fn().mockImplementation(() => Promise.resolve({ id: 1, quantity_available: 1 })),
    update: jest.fn(),
};

const mockUsersService = {
    existing: jest.fn().mockImplementation(() => Promise.resolve({ id: 1 })),
};

const mockRentsRepository = {
    create: jest.fn(),
    save: jest.fn(),
    findOne: jest.fn(),
    find: jest.fn(),
    findOneRents: jest.fn(() => Promise.resolve({ id: 1 })),
    delete: jest.fn(),
    update: jest.fn()
};

describe('RentsService', () => {
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                RentsService,
                { provide: BooksService, useValue: mockBooksService },
                { provide: UsersService, useValue: mockUsersService },
                { provide: 'RentEntityRepository', useValue: mockRentsRepository },
            ],
        }).compile();

        rentsService = module.get<RentsService>(RentsService);
        booksService = module.get<BooksService>(BooksService);
        usersService = module.get<UsersService>(UsersService);
    });

    describe('create', () => {
        it('should create a new author', async () => {
            const data: CreateRentDto = {
                book_id: 1,
                due_date: faker.date.recent().toISOString(),
                rented_date: faker.date.recent().toISOString(),
                user_id: 1
            };

            const mockRents: RentEntity = {
                id: 1,
                ...data,
                user: {
                    email: faker.internet.email(),
                    password: faker.internet.password(),
                    username: faker.internet.userName(),
                    description: faker.lorem.text(),
                    img: faker.image.url(),
                    admin: 0,
                    id: 1,
                },
                book: {
                    id: 1,
                    title: faker.person.firstName(),
                    img: faker.image.url(),
                    author: { id: 1, name: faker.person.firstName() },
                    category: { id: 1, category_name: faker.person.firstName() },
                    description: faker.lorem.text(),
                    quantity_available: faker.number.int()
                }
            };

            mockRentsRepository.create.mockReturnValueOnce(mockRents);
            mockRentsRepository.save.mockResolvedValueOnce(mockRents);

            const result = await rentsService.create(data);

            expect(result).toEqual(mockRents);

        });


    });

    describe('findAll', () => {
        it('Should return all book', async () => {
            const mockRents: RentEntity[] = [
                {
                    id: 1,
                    due_date: faker.date.recent().toISOString(),
                    rented_date: faker.date.recent().toISOString(),
                    book: {
                        id: 1,
                        title: faker.person.firstName(),
                        img: faker.image.url(),
                        author: { id: 1, name: faker.person.firstName() },
                        category: { id: 1, category_name: faker.person.firstName() },
                        description: faker.lorem.text(),
                        quantity_available: faker.number.int()
                    },
                    user: {
                        email: faker.internet.email(),
                        password: faker.internet.password(),
                        username: faker.internet.userName(),
                        description: faker.lorem.text(),
                        img: faker.image.url(),
                        admin: 0,
                        id: 1,
                    }
                }

            ]
            mockRentsRepository.find.mockResolvedValueOnce(mockRents)

            const result = await rentsService.findAll()

            expect(result).toEqual(mockRents)
        })
    })

    describe('findOneRents', () => {
        it('Should return one Rents', () => {
            const mockRents: RentEntity = {
                id: 1,
                due_date: faker.date.recent().toISOString(),
                rented_date: faker.date.recent().toISOString(),
                user: {
                    email: faker.internet.email(),
                    password: faker.internet.password(),
                    username: faker.internet.userName(),
                    description: faker.lorem.text(),
                    img: faker.image.url(),
                    admin: 0,
                    id: 1,
                },
                book: {
                    id: 1,
                    title: faker.person.firstName(),
                    img: faker.image.url(),
                    author: { id: 1, name: faker.person.firstName() },
                    category: { id: 1, category_name: faker.person.firstName() },
                    description: faker.lorem.text(),
                    quantity_available: faker.number.int()
                }
            }




        })
    })

    describe('findOne', () => {
        it('should throw NotFoundException if no reviews are found for the rents', async () => {
            const id = null;
            const emptyReviews = [];
            mockRentsRepository.find.mockResolvedValue(emptyReviews)

            await expect(rentsService.findOne(null)).rejects.toThrow(
                new NotFoundException(`No reviews found for book with ID ${id}`),
            );
        })

        it('should return rents if rents are found for the user', async () => {
            const id = 2;
            const allRents = [
                { id: 1, book: { id: 1 }, user: { id: 1 } },
                { id: 2, book: { id: 1 }, user: { id: 2 } },
            ];
            jest.spyOn(mockRentsRepository, 'find').mockResolvedValue(allRents);

            const result = await rentsService.findOne(id);

            const rentsWithMatchingId = allRents.filter(rent => rent.id === id);

            expect(result).toEqual(rentsWithMatchingId);
        });

    })

    describe('update', () => {
        it('Update rent with success', async () => {

            const initialRentData: RentEntity = {
                id: 1,
                book: {
                    id: 1,
                    title: faker.person.firstName(),
                    img: faker.image.url(),
                    author: { id: 1, name: faker.person.firstName() },
                    category: { id: 1, category_name: faker.person.firstName() },
                    description: faker.lorem.text(),
                    quantity_available: faker.number.int()
                },
                due_date: faker.date.recent().toISOString(),
                rented_date: faker.date.recent().toISOString(),
                user: {
                    id: 1,
                    email: faker.internet.email(),
                    password: faker.internet.password(),
                    username: faker.internet.userName(),
                    description: faker.lorem.text(),
                    img: faker.image.url(),
                    admin: 0,
                }
            };

            const updatedRentData: RentEntity = {
                id: 2,
                book: {
                    id: 1,
                    title: faker.person.firstName(),
                    img: faker.image.url(),
                    author: { id: 1, name: faker.person.firstName() },
                    category: { id: 1, category_name: faker.person.firstName() },
                    description: faker.lorem.text(),
                    quantity_available: faker.number.int()
                },
                due_date: faker.date.recent().toISOString(),
                rented_date: '2002-08-28',
                user: {
                    id: 1,
                    email: faker.internet.email(),
                    password: faker.internet.password(),
                    username: faker.internet.userName(),
                    description: faker.lorem.text(),
                    img: faker.image.url(),
                    admin: 0,
                }
            };

            mockRentsRepository.findOne.mockResolvedValueOnce(1);


            mockRentsRepository.update.mockResolvedValueOnce(updatedRentData);

            const result = await rentsService.update(1, { rented_date: '2002-08-28' });

            expect(result).toEqual(updatedRentData);

        });

        it('Throws NotFoundException if rent is not found', async () => {

            mockRentsRepository.findOneRents.mockResolvedValue(null);

            await expect(rentsService.update(1, { rented_date: '2002-08-28' })).rejects.toThrowError(NotFoundException);
        });
    })

    describe('romove', () => {
        it('should remove a rent by ID and update the book quantity if available', async () => {
            const id = 1;

            const existingRent = { id: 1, book: { id: 1, quantity_available: 1 } };
            jest.spyOn(mockRentsRepository, 'findOne').mockResolvedValue(existingRent);

            const deleteResult = { affected: 1 };
            jest.spyOn(mockRentsRepository, 'delete').mockResolvedValue(deleteResult);

            const result = await rentsService.remove(id);

            expect(result).toEqual({ message: `Rent with ID ${id} successfully deleted and book quantity updated` });

            expect(mockBooksService.update).toHaveBeenCalledWith(existingRent.book.id, { quantity_available: 2 });
        });

        it('should throw BadRequestException if the book is not available for rent', async () => {
            const id = 1;

            const existingRent = { id: 1, book: { id: 1, quantity_available: 0 } };
            jest.spyOn(mockRentsRepository, 'findOne').mockResolvedValue(existingRent);


            await expect(rentsService.remove(id)).rejects.toThrow(BadRequestException);
        });


    })
})