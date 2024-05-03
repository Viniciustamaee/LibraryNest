import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUsersInput } from 'src/graphQL/users/input/user.input';
import { UserEntity } from './entity/users.entity';
const salts = 5 //env

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>
  ) { }

  async create({ email, username, description, password, img }) {
    const existingUser = await this.usersRepository.findOne({
      where: { email, username }
    });

    if (existingUser) {
      throw new ConflictException("User already exists");
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

    const existingUser = await this.existing(id)

    if (!existingUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }


    const oneUser = await this.usersRepository.findOne({ where: { id } })


    return oneUser;
  }

  async update(id: number, data: CreateUsersInput) {
    const existingUser = await this.existing(id);
    if (!existingUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    const hashedPassword = await bcrypt.hash(data.password, salts);

    const updatedUserData = {
      ...data,
      password: hashedPassword,
    };

    await this.usersRepository.update(id, updatedUserData);

    const updatedUser = await this.usersRepository.findOne({ where: { id } });
    return updatedUser;
  }

  async remove(id: number) {
    const existingUser = await this.existing(id)

    if (!existingUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
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
