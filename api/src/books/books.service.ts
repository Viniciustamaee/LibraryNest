import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoriesService } from '../categories/categories.service';
import { AuthorsService } from '../authors/authors.service';
import { BookEntity } from './entity/books.entity';
import { inputBook } from 'src/graphQL/book/input/book.input';

@Injectable()
export class BooksService {

  constructor(
    @InjectRepository(BookEntity)
    private bookRepository: Repository<BookEntity>,
    private readonly categoryService: CategoriesService,
    private readonly authorService: AuthorsService,
  ) { }

  async create({ category_id, author_id, description, img, quantity_available, title }) {

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



  async update(id: number, input: inputBook): Promise<BookEntity> {
    const bookToUpdate = await this.bookRepository.findOne({ where: { id } });
    if (!bookToUpdate) {
      throw new Error('Book not found');
    }

    bookToUpdate.title = input.title;
    bookToUpdate.quantity_available = input.quantity_available;
    bookToUpdate.img = input.img;


    if (input.img) {
      bookToUpdate.img = bookToUpdate.img
    }

    bookToUpdate.description = input.description;

    const author = await this.authorService.findOne(input.author_id);
    if (!author) {
      throw new Error('Author not found');
    }

    bookToUpdate.author = author;

    const category = await this.categoryService.findOne(input.category_id);
    if (!category) {
      throw new Error('Category not found');
    }

    bookToUpdate.category = category;

    return await this.bookRepository.save(bookToUpdate);
  }



  async remove(id: number) {
    const existingBook = await this.existing(id);
  
    if (!existingBook) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
  
    await this.bookRepository.delete({ id });
  
    return existingBook;
  }
  


  existing(id: number) {
    return this.bookRepository.findOne({
      where: {
        id
      }
    })
  }

}
