import { Test, TestingModule } from '@nestjs/testing';
import { BooksService } from '../../books.service';


const mockAuthorRepository = {
  create: jest.fn(),
  save: jest.fn(),
  findOne: jest.fn(),
  find: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

describe('BooksService', () => {
  let service: BooksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BooksService,
        { provide: 'BooksEntityRepository', useValue: mockAuthorRepository },
      ],
    }).compile();

    service = module.get<BooksService>(BooksService);
  });



});
