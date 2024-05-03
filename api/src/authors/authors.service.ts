import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { createAuthorInputs } from 'src/graphQL/auhtors/input/category.input';
import { Repository } from 'typeorm';
import { AuthorEntity } from './entity/authors.entity';


@Injectable()
export class AuthorsService {

  constructor(
    @InjectRepository(AuthorEntity)
    private authorRepository: Repository<AuthorEntity>
  ) { }

  async create({ name }: createAuthorInputs) {
    const existingAuthor = await this.authorRepository.findOne({
      where: {
        name
      }
    })
    if (existingAuthor) {
      throw new ConflictException("Author already exists");    }
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

    const oneAuthor = await this.authorRepository.findOne({ where: { id } })
    return oneAuthor;
  }

  async update(id: number, { name }: createAuthorInputs) {

    const existingAuthor = await this.existing(id)

    if (!existingAuthor) {
      throw new NotFoundException(`Author with ID ${id} not found`);
    }

    await this.authorRepository.update(id, { name });

    const updatedAuthor = await this.authorRepository.findOne({ where: { id } });

    return updatedAuthor;
  }

  async remove(id: number): Promise<AuthorEntity> {
    const existingAuthor = await this.existing(id);

    if (!existingAuthor) {
        throw new NotFoundException(`Author with ID ${id} not found`);
    }

    await this.authorRepository.delete({ id });

    return existingAuthor; // Retorna o objeto do autor excluído
}



  existing(id: number) {
    return this.authorRepository.findOne({
      where: {
        id
      }
    })
  }
}
