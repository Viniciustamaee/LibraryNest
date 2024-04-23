import { CreateAuthorDto } from '../../dto/create-author.dto';
import { AuthorEntity } from '../../entities/author.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthorsService } from '../../authors.service';
import { NotFoundException } from '@nestjs/common';
import { validate } from 'class-validator';

const mockAuthorRepository = {
    create: jest.fn(),
    save: jest.fn(),
    findOne: jest.fn(),
    find: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
};

describe('AuthorsService', () => {
    let service: AuthorsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthorsService,
                { provide: 'AuthorEntityRepository', useValue: mockAuthorRepository },
            ],
        }).compile();

        service = module.get<AuthorsService>(AuthorsService);
    });


    describe('DTO validation', () => {
        it('should pass validation with a valid name', async () => {
            const createAuthorDto = new CreateAuthorDto();
            createAuthorDto.name = 'John';

            const errors = await validate(createAuthorDto);

            expect(errors.length).toEqual(0);
        });

        it('should fail validation with an empty name', async () => {
            const createAuthorDto = new CreateAuthorDto();
            createAuthorDto.name = '';

            const errors = await validate(createAuthorDto);

            expect(errors.length).toBeGreaterThan(0);
            expect(errors[0].constraints).toHaveProperty('isNotEmpty');
        });
    })

    describe('create', () => {
        it('should create a new author', async () => {
            const createAuthorDto: CreateAuthorDto = { name: 'bhads' };

            const mockAuthor: AuthorEntity = { id: 1, ...createAuthorDto };


            mockAuthorRepository.findOne.mockResolvedValueOnce(null);
            mockAuthorRepository.create.mockReturnValueOnce(mockAuthor);
            mockAuthorRepository.save.mockResolvedValueOnce(mockAuthor);

            const result = await service.create(createAuthorDto);

            expect(result).toEqual(mockAuthor);
        });

        it('should return "Exist the author" if author already exists', async () => {
            const createAuthorDto: CreateAuthorDto = { name: 'John Doe' };

            mockAuthorRepository.findOne.mockResolvedValueOnce({});

            const result = await service.create(createAuthorDto);

            expect(result).toEqual('Exist the author');
        });
    });

    describe('findAll', () => {
        it('Should return all authors', async () => {
            const mockAuthor: AuthorEntity[] = [
                { id: 1, name: 'Author 1' },
                { id: 2, name: 'Author 2' },
            ]

            mockAuthorRepository.find.mockResolvedValueOnce(mockAuthor)

            const result = await service.findAll();

            expect(result).toEqual(mockAuthor);
        })
    })

    describe('findOne', () => {
        it('Should return one Author', async () => {
            const mockAuthor: AuthorEntity = { id: 1, name: 'Author 1' }

            mockAuthorRepository.findOne.mockResolvedValue(mockAuthor)

            const result = await service.findOne(1);

            expect(result).toEqual(mockAuthor);

        })
        it('should throw NotFoundException if author with the specified ID is not found', async () => {
            mockAuthorRepository.findOne.mockResolvedValueOnce(null);
            const invalidId = 999;
            await expect(service.findOne(invalidId)).rejects.toThrow(NotFoundException);
        });

        describe('update', () => {
            it('should update the author with the specified ID and return the updated author', async () => {
                const existingAuthor: AuthorEntity = { id: 1, name: 'Tamae' };

                const updatedAuthor: AuthorEntity = { id: 1, name: 'Vincius' };

                mockAuthorRepository.findOne.mockResolvedValueOnce(existingAuthor);

                mockAuthorRepository.update.mockResolvedValueOnce({});

                mockAuthorRepository.findOne.mockResolvedValueOnce(updatedAuthor);

                const result = await service.update(1, { name: 'Vinicius' });

                expect(result).toEqual(updatedAuthor);
            });

            it('should throw NotFoundException if author with the specified ID is not found', async () => {
                mockAuthorRepository.findOne.mockResolvedValueOnce(null);

                const invalidId = 999;

                await expect(service.update(invalidId, { name: 'Vinicius' })).rejects.toThrow(NotFoundException);
            });
        });

        describe('remove', () => {
            it('should remove the author with the specified ID and return the deletion information', async () => {
                const existingAuthor: AuthorEntity = { id: 1, name: 'Vinicius' };

                const deleteInfo = { affected: 1 };

                mockAuthorRepository.findOne.mockResolvedValueOnce(existingAuthor);

                mockAuthorRepository.delete.mockResolvedValueOnce(deleteInfo);
                const result = await service.remove(1);
                expect(result).toEqual(deleteInfo);
            });

            it('should throw NotFoundException if author with the specified ID is not found', async () => {
                mockAuthorRepository.findOne.mockResolvedValueOnce(null);


                const invalidId = 999;

                await expect(service.remove(invalidId)).rejects.toThrow(NotFoundException);
            });
        });


    })
});
