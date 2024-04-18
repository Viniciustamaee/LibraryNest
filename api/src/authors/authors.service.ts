import { Injectable } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthorEntity } from './entities/author.entity';

@Injectable()
export class AuthorsService {

  constructor(
    @InjectRepository(AuthorEntity)
    private usersRepository: Repository<AuthorEntity>
  ) { }

  create(createAuthorDto: CreateAuthorDto) {
    const sla = this.usersRepository.create({

    })
    return 'This action adds a new author';
  }

  findAll() {
    return `This action returns all authors`;
  }

  findOne(id: number) {
    return `This action returns a #${id} author`;
  }

  update(id: number, updateAuthorDto: UpdateAuthorDto) {
    return `This action updates a #${id} author`;
  }

  remove(id: number) {
    return `This action removes a #${id} author`;
  }
}
