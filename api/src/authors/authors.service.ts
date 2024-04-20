import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { AuthorEntity } from './entities/author.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


@Injectable()
export class AuthorsService {

  constructor(
    @InjectRepository(AuthorEntity)
    private authorRepository: Repository<AuthorEntity>
  ) { }

  async create({ name }: CreateAuthorDto) {
    const existingAuthor = await this.authorRepository.findOne({
      where: {
        name
      }
    })

    if (existingAuthor) {
      return "Exist the author"
    }


    const newAuthor = await this.authorRepository.create({ name });
    return await this.authorRepository.save(newAuthor);
  }

  
  async findAll() {
    const allAuthor = await this.authorRepository.find()
    return allAuthor;
  }

  async findOne(id: number) {

    const existingAuthor = await this.existing(id)

    if (!existingAuthor) {
      throw new NotFoundException(`Author with ID ${id} not found`);
    }

    const oneAuthor = await this.authorRepository.findBy({ id })
    return oneAuthor;
  }

  async update(id: number, { name }: UpdateAuthorDto) {

    const existingAuthor = await this.existing(id)

    if (!existingAuthor) {
      throw new NotFoundException(`Author with ID ${id} not found`);
    }

    await this.authorRepository.update(id, { name });

    const updatedAuthor = await this.authorRepository.findBy({ id });

    return updatedAuthor;
  }


  async remove(id: number) {

    const existingAuthor = await this.existing(id)

    if (!existingAuthor) {
      throw new NotFoundException(`Author with ID ${id} not found`);
    }

    const deleteAuthor = await this.authorRepository.delete({ id })

    return deleteAuthor;
  }


  existing(id: number) {
    return this.authorRepository.findOne({
      where: {
        id
      }
    })
  }
}
