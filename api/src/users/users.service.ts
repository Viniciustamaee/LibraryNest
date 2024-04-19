import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
const salts = 5 //env

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>
  ) { }

  async create({ email, username, description, password, img }: CreateUserDto) {
    const existingUser = await this.usersRepository.findOne({
      where: { email, username }
    });

    if (existingUser) {
      return "The user with the same name or email already exists";
    }

    password = await bcrypt.hash(password, salts);

    const newUser = this.usersRepository.create({
      username,
      email,
      description,
      password,
      img,
    });

    return await this.usersRepository.save(newUser);

  }

  async findAll() {
    const allBooks = await this.usersRepository.find()
    return allBooks;
  }

  async findOne(id: number) {
    const oneUser = await this.usersRepository.findBy({ id })
    if (oneUser.length <= 0) {
      return "this user does not exist"
    }

    return oneUser;
  }

  async update(id: number, data: UpdateUserDto) {
    if (!this.existing(id)) {
      throw new NotFoundException(`Author with ID ${id} not found`);
    }

    await this.usersRepository.update(id, data);

    const updateUser = await this.usersRepository.findBy({ id });

    return updateUser;
  }

  async remove(id: number) {
    if (!this.existing) {
      throw new NotFoundException(`Author with ID ${id} not found`);
    }

    const deleteBook = await this.usersRepository.delete({ id })

    return deleteBook;
  }

  existing(id: number) {
    return this.usersRepository.findOne({
      where: {
        id
      }
    })
  }
}
