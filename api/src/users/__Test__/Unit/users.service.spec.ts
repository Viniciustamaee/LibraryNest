import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../../users.service';
import { CreateUserDto } from '../../inputs/create-user.dto';
import { validate } from 'class-validator';
import { UserEntity } from '../../types/user.entity';
import { NotFoundException } from '@nestjs/common';
import { faker } from '@faker-js/faker';

const mockUserRepository = {
  create: jest.fn(),
  save: jest.fn(),
  findOne: jest.fn(),
  find: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService,
        { provide: 'UserEntityRepository', useValue: mockUserRepository }
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });


  describe('create', () => {
    it("should create a new user", async () => {
      const data: CreateUserDto = { email: faker.internet.email(), password: "12!@A", username: faker.internet.userName(), description: faker.lorem.text(), img: faker.image.url() }

      const mockUser: UserEntity = { id: 1, ...data, admin: 0 };

      mockUserRepository.findOne.mockResolvedValueOnce(null);
      mockUserRepository.create.mockReturnValueOnce(mockUser);
      mockUserRepository.save.mockResolvedValueOnce(mockUser);

      const result = await service.create(data);

      expect(result).toEqual(mockUser);

    })
  })

  it('should return "Exist the user" if user already exists', async () => {

    const data: CreateUserDto = { email: "tamae@pedbot.com", password: "12!@A", username: "vinicius", description: faker.lorem.text(), img: faker.image.url() }
    mockUserRepository.findOne.mockResolvedValueOnce({});

    const result = await service.create(data);

    expect(result).toEqual('The user with the same name or email already exists');
  })

  describe('findAll', () => {
    it('Should return all authors', async () => {
      const mockUSer: UserEntity[] = [
        { email: faker.internet.email(), password: "12!@A", username: faker.internet.userName(), description: faker.lorem.text(), img: faker.image.url(), admin: 0, id: 1 },
        { email: faker.internet.email(), password: "12!@A", username: faker.internet.userName(), description: faker.lorem.text(), img: faker.image.url(), admin: 0, id: 2 },
      ]

      mockUserRepository.find.mockResolvedValueOnce(mockUSer)

      const result = await service.findAll();

      expect(result).toEqual(mockUSer);
    })
  })

  describe('findOne', () => {
    it('Should return one User', async () => {
      const mockUser: UserEntity = { email: faker.internet.email(), password: "12!@A", username: faker.internet.userName(), description: faker.lorem.text(), img: faker.image.url(), admin: 0, id: 1 }

      mockUserRepository.findOne.mockResolvedValue(mockUser)

      const result = await service.findOne(1);

      expect(result).toEqual(mockUser);
    })

    it('should throw NotFoundException if author with the specified ID is not found', async () => {
      mockUserRepository.findOne.mockResolvedValueOnce(null);
      await expect(service.findOne(faker.number.int())).rejects.toThrow(NotFoundException);
    });
  })
  describe('update', () => {
    it('should update the user with the specified ID and return the updated user', async () => {
      const exisitingUser: UserEntity = { email: "tamae@pedbot.com", password: "12!@A", username: "vinicius", description: "lindo", img: 'default.png', admin: 0, id: 1 };

      const updateUser: UserEntity = { email: "vinicius@pedbot.com", password: "12!@A", username: "vinicius", description: "lindo", img: 'default.png', admin: 0, id: 1 };

      mockUserRepository.findOne.mockResolvedValueOnce(exisitingUser);

      mockUserRepository.update.mockResolvedValueOnce({});

      mockUserRepository.findOne.mockResolvedValueOnce(updateUser);

      const result = await service.update(1, { email: "vinicius@pedbot.com", password: "12!@A", username: "vinicius", description: "lindo", img: 'default.png' });

      expect(result).toEqual(updateUser);
    });

    it('should throw NotFoundException if user with the specified ID is not found', async () => {
      mockUserRepository.findOne.mockResolvedValueOnce(null);


      await expect(service.update(faker.number.int(), { email: faker.internet.email(), password: "12!@A", username: faker.internet.userName(), description: faker.lorem.text(), img: faker.image.url() })).rejects.toThrow(NotFoundException);
    });

  })
  describe('remove', () => {
    it('should remove the user with the specified ID and return the deletion information', async () => {
      const exisitingUser: UserEntity = { email: faker.internet.email(), password: "12!@A", username: faker.internet.userName(), description: faker.lorem.text(), img: faker.image.url(), admin: 0, id: 2 };

      const deleteInfo = { affected: 1 };

      mockUserRepository.findOne.mockResolvedValueOnce(exisitingUser);

      mockUserRepository.delete.mockResolvedValueOnce(deleteInfo);
      const result = await service.remove(1);
      expect(result).toEqual(deleteInfo);
    });

    it('should throw NotFoundException if author with the specified ID is not found', async () => {
      mockUserRepository.findOne.mockResolvedValueOnce(null);

      await expect(service.remove(faker.number.int())).rejects.toThrow(NotFoundException);
    });
  });
})

