import { CategoriesService } from '../../../categories/categories.service';
import { AuthorsService } from '../../../authors/authors.service';
import { CreateBookDto } from '../../dto/create-book.dto';
import { BookEntity } from '../../entities/book.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { BooksService } from '../../books.service';
import { faker } from '@faker-js/faker';
import { NotFoundException } from '@nestjs/common';
import { mock } from 'node:test';


const mockBookRepository = {
    create: jest.fn(),
    save: jest.fn(),
    findOne: jest.fn().mockImplementation((id) => {
        if (id.where.id == 1) {
            return Promise.resolve(new BookEntity())
        }
        return null
    }),
    find: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
};

const mockCategory = {
    findOne: jest.fn().mockImplementation((id) => {
        if (id.where.id == 1) {
            return Promise.resolve(new BookEntity())
        }
        return null
    }),
}

const mockAthor = {
    findOne: jest.fn().mockImplementation((id) => {
        if (id.where.id == 1) {
            return Promise.resolve(new BookEntity())
        }
        return null
    }),
}


describe('BooksService', () => {
    let service: BooksService;
    let serviceAuthor: AuthorsService
    let serviceCategory: CategoriesService

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                BooksService,
                CategoriesService,
                AuthorsService,
                { provide: 'BookEntityRepository', useValue: mockBookRepository },
                { provide: 'CategoryEntityRepository', useValue: mockCategory },
                { provide: 'AuthorEntityRepository', useValue: mockAthor },
            ],
        }).compile();

        service = module.get<BooksService>(BooksService);
        serviceCategory = module.get<CategoriesService>(CategoriesService)
        serviceAuthor = module.get<AuthorsService>(AuthorsService)
    });

    describe('create', () => {
        it('should create a new author', async () => {
            const data: CreateBookDto = { title: faker.person.firstName(), img: faker.image.url(), author_id: 1, category_id: 1, description: faker.lorem.text(), quantity_available: faker.number.int() };

            const mockBook: BookEntity = {
                id: 1,
                ...data,
                category: { id: 1, category_name: faker.person.firstName() },
                author: { id: 1, name: faker.person.firstName() }
            };


            mockBookRepository.create.mockReturnValueOnce(mockBook);
            mockBookRepository.save.mockResolvedValueOnce(mockBook);

            const result = await service.create(data);

            expect(result).toEqual(mockBook);
        });
        it('Should return "Exist the author" if category already exists', async () => {
            const data: CreateBookDto = {
                title: faker.person.firstName(),
                img: faker.image.url(),
                author_id: 1, category_id: 1,
                description: faker.lorem.text(),
                quantity_available: faker.number.int()
            };

            const mockBook: BookEntity = {
                id: 1,
                ...data,
                category: { id: 1, category_name: faker.person.firstName() },
                author: { id: 1, name: faker.person.firstName() }
            };

            mockBookRepository.create.mockReturnValueOnce(mockBook);
            mockBookRepository.save.mockResolvedValueOnce(mockBook);

            const result = await service.create(data);

            expect(result).toEqual(mockBook);

        });
    });

    describe('findAll', () => {
        it('Should return all Books', async () => {
            const mockBook: BookEntity[] = [
                {
                    id: 1,
                    title: faker.person.firstName(),
                    img: faker.image.url(),
                    author: { id: 1, name: faker.person.firstName() },
                    category: { id: 1, category_name: faker.person.firstName() },
                    description: faker.lorem.text(),
                    quantity_available: faker.number.int()
                }, {
                    id: 2,
                    title: faker.person.firstName(),
                    img: faker.image.url(),
                    author: { id: 2, name: faker.person.firstName() },
                    category: { id: 2, category_name: faker.person.firstName() },
                    description: faker.lorem.text(),
                    quantity_available: faker.number.int()
                },
            ]

            mockBookRepository.find.mockResolvedValueOnce(mockBook)

            const result = await service.findAll()

            expect(result).toEqual(mockBook)
        })
    })


    describe('findOne', () => {
        it('Should return one book', async () => {
            const data: BookEntity = {
                id: 1,
                title: faker.person.firstName(),
                img: faker.image.url(),
                author: { id: 1, name: faker.person.firstName() },
                category: { id: 1, category_name: faker.person.firstName() },
                description: faker.lorem.text(),
                quantity_available: faker.number.int()
            }

            mockBookRepository.findOne.mockResolvedValue(data);

            const result = await service.findOne(1);
            expect(result).toEqual(data);


        })
        it('Should throw NotFoundException if book with the specified ID is not found', async () => {
            mockBookRepository.findOne.mockResolvedValueOnce(null);

            await expect(service.findOne(faker.number.int())).rejects.toThrow(NotFoundException);

        })
    })

    describe('update', () => {
        it('Should update the book with the specified ID and return the updated book', async () => {
            const data: BookEntity = {
                id: 1,
                title: 'antigo',
                img: faker.image.url(),
                author: { id: 1, name: faker.person.firstName() },
                category: { id: 1, category_name: faker.person.firstName() },
                description: faker.lorem.text(),
                quantity_available: faker.number.int()
            }

            const Newdata: BookEntity = {
                id: 1,
                title: 'novo',
                img: faker.image.url(),
                author: { id: 1, name: faker.person.firstName() },
                category: { id: 1, category_name: faker.person.firstName() },
                description: faker.lorem.text(),
                quantity_available: faker.number.int()
            }

            mockBookRepository.findOne.mockResolvedValueOnce(data);

            mockBookRepository.update.mockResolvedValueOnce({});

            mockBookRepository.findOne.mockResolvedValueOnce(Newdata);

            const result = await service.update(1, {
                title: 'novo',
                img: faker.image.url(),
                author_id: 1,
                category_id: 1,
                description: faker.lorem.text(),
                quantity_available: faker.number.int()
            });

            expect(result).toEqual(data);

        })
    })
});
