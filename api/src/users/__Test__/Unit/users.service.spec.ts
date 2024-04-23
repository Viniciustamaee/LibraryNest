import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../../users.service';
import { CreateUserDto } from '../../dto/create-user.dto';
import { validate } from 'class-validator';
import { UserEntity } from '../../entities/user.entity';
import { NotFoundException } from '@nestjs/common';

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

  describe('DTO validation', () => {
    it('Should pass validation', async () => {
      const createUserDto = new CreateUserDto();
      createUserDto.email = 'rodrio@teste.com'
      createUserDto.username = 'Admin';
      createUserDto.password = '12!@A';
      createUserDto.description = 'boa'
      createUserDto.img = 'boa.png'

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

    describe('create', () => {
      it("should create a new user", async () => {
        const data: CreateUserDto = { email: "tamae@pedbot.com", password: "Boa", username: "vinicius", description: "lindo", img: 'default.png' }

        const mockUser: UserEntity = { id: 1, ...data, admin: 0 };

        mockUserRepository.findOne.mockResolvedValueOnce(null);
        mockUserRepository.create.mockReturnValueOnce(mockUser);
        mockUserRepository.save.mockResolvedValueOnce(mockUser);

        const result = await service.create(data);

        expect(result).toEqual(mockUser);

      })
    })

    it('should return "Exist the user" if user already exists', async () => {

      const data: CreateUserDto = { email: "tamae@pedbot.com", password: "Boa", username: "vinicius", description: "lindo", img: 'default.png' }
      mockUserRepository.findOne.mockResolvedValueOnce({});

      const result = await service.create(data);

      expect(result).toEqual('The user with the same name or email already exists');
    })

    describe('findAll', () => {
      it('Should return all authors', async () => {
        const mockUSer: UserEntity[] = [
          { email: "tamae@pedbot.com", password: "Boa", username: "vinicius", description: "lindo", img: 'default.png', admin: 0, id: 1 },
          { email: "test@pedbot.com", password: "123", username: "vinicius", description: "lindo", img: 'default.png', admin: 0, id: 2 },
        ]

        mockUserRepository.find.mockResolvedValueOnce(mockUSer)

        const result = await service.findAll();

        expect(result).toEqual(mockUSer);
      })
    })

    describe('findOne', () => {
      it('Should return one User', async () => {
        const mockUser: UserEntity = { email: "test@pedbot.com", password: "123", username: "vinicius", description: "lindo", img: 'default.png', admin: 0, id: 2 }

        mockUserRepository.findOne.mockResolvedValue(mockUser)

        const result = await service.findOne(1);

        expect(result).toEqual(mockUser);
      })

      it('should throw NotFoundException if author with the specified ID is not found', async () => {
        mockUserRepository.findOne.mockResolvedValueOnce(null);
        const invalidId = 999;
        await expect(service.findOne(invalidId)).rejects.toThrow(NotFoundException);
      });
    })
    describe('update', () => {
      it('should update the user with the specified ID and return the updated user', async () => {
        const exisitingUser: UserEntity = { email: "tamae@pedbot.com", password: "Boa", username: "vinicius", description: "lindo", img: 'default.png', admin: 0, id: 1 };

        const updateUser: UserEntity = { email: "ricardo@pedbot.com", password: "Boa", username: "vinicius", description: "lindo", img: 'default.png', admin: 0, id: 1 };

        mockUserRepository.findOne.mockResolvedValueOnce(exisitingUser);

        mockUserRepository.update.mockResolvedValueOnce({});

        mockUserRepository.findOne.mockResolvedValueOnce(updateUser);

        const result = await service.update(1, { email: "ricardo@pedbot.com", password: "Boa", username: "vinicius", description: "lindo", img: 'default.png' });

        expect(result).toEqual(updateUser);
      });

      it('should throw NotFoundException if user with the specified ID is not found', async () => {
        mockUserRepository.findOne.mockResolvedValueOnce(null);

        const invalidId = 999;

        await expect(service.update(invalidId, { email: "ricardo@pedbot.com", password: "Boa", username: "vinicius", description: "lindo", img: 'default.png' })).rejects.toThrow(NotFoundException);
      });

    })
    describe('remove', () => {
      it('should remove the user with the specified ID and return the deletion information', async () => {
        const exisitingUser: UserEntity = { email: "test@pedbot.com", password: "123", username: "vinicius", description: "lindo", img: 'default.png', admin: 0, id: 2 };

        const deleteInfo = { affected: 1 };

        mockUserRepository.findOne.mockResolvedValueOnce(exisitingUser);

        mockUserRepository.delete.mockResolvedValueOnce(deleteInfo);
        const result = await service.remove(1);
        expect(result).toEqual(deleteInfo);
      });

      it('should throw NotFoundException if author with the specified ID is not found', async () => {
        mockUserRepository.findOne.mockResolvedValueOnce(null);

        const invalidId = 999;

        await expect(service.remove(invalidId)).rejects.toThrow(NotFoundException);
      });
    });
  })
});
