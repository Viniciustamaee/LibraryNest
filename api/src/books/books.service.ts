import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { BookEntity } from './entities/book.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BooksService {

  constructor(
    @InjectRepository(BookEntity)
    private bookRepository: Repository<BookEntity>) { }



  async create({ category_id, author_id, description, img, quantity_available, title }: CreateBookDto) {
    const existingBook = await this.bookRepository.findOne({
      where: { title }
    });

    if (existingBook) {
      return "The book with the same title already exists";
    }

    const newBook = this.bookRepository.create({
      title,
      quantity_available,
      img,
      description,
      category: { id: category_id },
      author: { id: author_id }
    });

    return await this.bookRepository.save(newBook);
  }


  async findAll() {
    const allBooks = await this.bookRepository.find({ relations: ['category', 'author'] })

    return allBooks;
  }

  async findOne(id: number) {
    const oneBook = await this.bookRepository.findOne({ where: { id }, relations: ['category', 'author'] })

    return oneBook;
  }

  async update(id: number, data: UpdateBookDto) {
    if (!this.existing(id)) {
      throw new NotFoundException(`Author with ID ${id} not found`);
    }


    await this.bookRepository.update(id, data);


    const updateBook = await this.bookRepository.findBy({ id });


    return updateBook;
  }

  async remove(id: number) {
    if (!this.existing) {
      throw new NotFoundException(`Author with ID ${id} not found`);
    }

    const deleteBook = await this.bookRepository.delete({ id })

    return deleteBook;
  }

  existing(id: number) {
    return this.bookRepository.findOne({
      where: {
        id
      }
    })
  }

}
