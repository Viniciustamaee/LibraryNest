import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { BookEntity } from './entities/book.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoriesService } from '../categories/categories.service';
import { AuthorsService } from '../authors/authors.service';

@Injectable()
export class BooksService {

  constructor(
    @InjectRepository(BookEntity)
    private bookRepository: Repository<BookEntity>,
    private readonly categoryService: CategoriesService,
    private readonly authorService: AuthorsService,
  ) { }

  async create({ category_id, author_id, description, img, quantity_available, title }: CreateBookDto) {

    const existingBook = await this.bookRepository.findOne({
      where: { title }
    });

    await this.authorService.findOne(author_id)
    await this.categoryService.findOne(category_id)

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

    const existingBooks = await this.existing(id)

    if (!existingBooks) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }

    const oneBook = await this.bookRepository.findOne({ where: { id }, relations: ['category', 'author'] })

    return oneBook;
  }


  async update(id: number, data: UpdateBookDto) {
    const existingBooks = await this.existing(id)

    if (!data) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }


    if (!existingBooks) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }

    const updateBook = await this.bookRepository.update(id, data);

    return updateBook;
  }

  async remove(id: number) {
    const existingBooks = await this.existing(id)

    if (!existingBooks) {
      throw new NotFoundException(`Book with ID ${id} not found`);
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
