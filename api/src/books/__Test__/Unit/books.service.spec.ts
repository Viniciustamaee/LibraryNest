// import { Test, TestingModule } from '@nestjs/testing';
// import { BooksService } from '../../books.service';
// import { CreateBookDto } from '../../dto/create-book.dto';
// import { BookEntity } from '../../entities/book.entity';


// const mockBookRepository = {
//   create: jest.fn(),
//   save: jest.fn(),
//   findOne: jest.fn(),
//   find: jest.fn(),
//   update: jest.fn(),
//   delete: jest.fn(),
// };

// describe('BooksService', () => {
//   let service: BooksService;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [BooksService,
//         { provide: 'BooksEntityRepository', useValue: mockBookRepository },
//       ],
//     }).compile();

//     service = module.get<BooksService>(BooksService);
//   });

//   describe('create', () => {
//     it('should create a new author', async () => {
//       const data: CreateBookDto = { title: 'teste', img: 'default.img', author_id: 1, category_id: 1, description: 'lindo', quantity_available: 2 };

//       const mockBook: BookEntity = {
//         id: 1,
//         ...data,
//         category: 'Ficção',
//         author: 'Autor XYZ'
//       };


//       mockBookRepository.findOne.mockResolvedValueOnce(null);
//       mockBookRepository.create.mockReturnValueOnce(mockBook);
//       mockBookRepository.save.mockResolvedValueOnce(mockBook);

//       const result = await service.create(createAuthorDto);

//       expect(result).toEqual(mockBook);
//     });


//   });
