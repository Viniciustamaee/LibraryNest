import { CreateCategoryDto } from '../../dto/create-category.dto';
import { CategoryEntity } from '../../entities/category.entity';
import { CategoriesService } from '../../categories.service';
import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { validate } from 'class-validator';
import { faker } from '@faker-js/faker';

const mockCategoryRepository = {
    create: jest.fn(),
    save: jest.fn(),
    findOne: jest.fn(),
    find: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
};

describe('CategoriesService', () => {
    let service: CategoriesService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [CategoriesService,
                { provide: 'CategoryEntityRepository', useValue: mockCategoryRepository },
            ],
        }).compile();

        service = module.get<CategoriesService>(CategoriesService);
    });

    describe('DTO validation', () => {
        it('should pass validation with a valid name', async () => {
            const createCategoryDto = new CreateCategoryDto();
            createCategoryDto.category_name = 'Terror';

            const errors = await validate(createCategoryDto);

            expect(errors.length).toEqual(0);
        });

        it('should fail validation with an empty name', async () => {
            const createCategoryDTO = new CreateCategoryDto();
            createCategoryDTO.category_name = '';

            const errors = await validate(createCategoryDTO);

            expect(errors.length).toBeGreaterThan(0);
            expect(errors[0].constraints).toHaveProperty('isNotEmpty');
        });
    })

    describe('create', () => {
        it('Should create a new Category', async () => {
            const createCategoryDto: CreateCategoryDto = {
                category_name: 'title'
            }
            const mockCategory: CategoryEntity = { id: 1, ...createCategoryDto };

            mockCategoryRepository.findOne.mockResolvedValueOnce(null);
            mockCategoryRepository.create.mockReturnValueOnce(mockCategory);
            mockCategoryRepository.save.mockResolvedValueOnce(mockCategory);

            const result = await service.create(createCategoryDto);

            expect(result).toEqual(mockCategory);
        })

        it('Should return "Exist the author" if category already exists', async () => {
            const createCategoryDto: CreateCategoryDto = { category_name: 'title' }

            mockCategoryRepository.findOne.mockResolvedValueOnce({})

            const result = await service.create(createCategoryDto)

            expect(result).toEqual('Exist the Category')
        })
    })

    describe('findAll', () => {
        it('Should retun all categories', async () => {
            const mockCategory: CategoryEntity[] = [
                { id: 1, category_name: 'terror' },
                { id: 2, category_name: 'ação' },
            ]

            mockCategoryRepository.find.mockResolvedValueOnce(mockCategory)

            const result = await service.findAll()

            expect(result).toEqual(mockCategory)
        })
    })

    describe('findOne', () => {
        it('Should return one category', async () => {
            const mockCategory: CategoryEntity = { id: 1, category_name: 'terror' };
            mockCategoryRepository.findOne.mockResolvedValue(mockCategory);

            const result = await service.findOne(1);

            expect(result).toEqual(mockCategory);
        });

        it('Should throw NotFoundException if category with the specified ID is not found', async () => {
            mockCategoryRepository.findOne.mockResolvedValueOnce(null);

            await expect(service.findOne(faker.number.int())).rejects.toThrow(NotFoundException);
        });
    });

    describe('update', () => {
        it('should update the category with the specified ID and return the updated category', async () => {
            const existingCategory: CategoryEntity = {
                id: 1, category_name: 'terror'
            }

            const updatedAuthor: CategoryEntity = {
                id: 1, category_name: 'romance'
            }

            mockCategoryRepository.findOne.mockResolvedValueOnce(existingCategory);

            mockCategoryRepository.update.mockResolvedValueOnce({});

            mockCategoryRepository.findOne.mockResolvedValueOnce(updatedAuthor);

            const result = await service.update(1, { category_name: 'romance' });

            expect(result).toEqual(updatedAuthor);
        })
        it('should throw NotFoundException if category with the specified ID is not found', async () => {
            mockCategoryRepository.findOne.mockResolvedValueOnce(null);

            const invalidId = 999;

            await expect(service.update(invalidId, { category_name: 'Jane Doe' })).rejects.toThrow(NotFoundException);
        });
    })

    describe('remove', () => {
        it('Should remove the Category with the specified ID and Return the deletion information', async () => {
            const existingCategory: CategoryEntity = { id: 1, category_name: 'terror' }

            const deleteinfo = { affected: 1 };

            mockCategoryRepository.findOne.mockResolvedValueOnce(existingCategory);

            mockCategoryRepository.delete.mockResolvedValueOnce(deleteinfo);

            const result = await service.remove(1)
            expect(result).toEqual(deleteinfo)
        });


    })

});
