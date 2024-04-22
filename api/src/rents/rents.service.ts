import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRentDto } from './dto/create-rent.dto';
import { UpdateRentDto } from './dto/update-rent.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { RentEntity } from './entities/rent.entity';
import { Repository } from 'typeorm';
import { BooksService } from 'src/books/books.service';
import { UsersService } from 'src/users/users.service';
import { chownSync } from 'fs';
import { Console } from 'console';

@Injectable()
export class RentsService {

  constructor(
    @InjectRepository(RentEntity)
    private rentsRepository: Repository<RentEntity>,
    private readonly booksService: BooksService,
    private readonly userService: UsersService

  ) { }

  async create({ due_date, book_id, rented_date, user_id }: CreateRentDto) {
    const book = await this.booksService.existing(book_id);
    const user = await this.userService.existing(user_id);

    if (!book) {
      throw new NotFoundException(`Book with ID ${book_id} not found`);
    }

    if (!user) {
      throw new NotFoundException(`User with ID ${user_id} not found`);
    }

    if (book.quantity_available < 0) {
      throw new BadRequestException(`Book with ID ${book_id} is not available for rent`);
    }

    book.quantity_available -= 1;
    await this.booksService.update(book_id, { quantity_available: book.quantity_available });

    const newRents = this.rentsRepository.create({
      due_date,
      rented_date,
      book: { id: book_id },
      user: { id: user_id }
    });

    return await this.rentsRepository.save(newRents);
  }


  async findAll() {
    const allRents = await this.rentsRepository.find({ relations: ['book', 'user'] })
    return allRents;
  }

  async findOne(id: number) {
    const allRents = await this.rentsRepository.find({ relations: ['book', 'user'] })
    const rentsWithMatchingBookId = allRents.filter(rents => rents.user.id === id);
    
    if (rentsWithMatchingBookId.length == 0) {
        throw new NotFoundException(`No reviews found for book with ID ${id}`);
    }

    return rentsWithMatchingBookId;

  }


  async findOneRents(id: number){
    const existingRents = await this.existing(id)


    if (!existingRents) {
      throw new NotFoundException(`Author with ID ${id} not found`);
    }

    const oneAuthor = await this.rentsRepository.find({
      where: { id },
      relations: ['book', 'user']
  });
  
    return oneAuthor;
  }

  async update(id: number, data: UpdateRentDto) {

    const existingRents = await this.existing(id)

    if (!existingRents) {
      throw new NotFoundException(`Rents with ID ${id} not found`);
    }

    const updateBook = await this.rentsRepository.update(id, data);


    return updateBook;
  }

  async remove(id: number) {

    const showRents = await this.rentsRepository.findOne({ where: { id }, relations: ['book'] })

    if (showRents.book.quantity_available > 0) {
      showRents.book.quantity_available += 1;
      await this.booksService.update(showRents.book.id, { quantity_available: showRents.book.quantity_available });
      
    } else {
      throw new BadRequestException(`Book with ID ${showRents.book.id} is not available for rent`);
    }

    await this.rentsRepository.delete({ id });
  

    return { message: `Rent with ID ${id} successfully deleted and book quantity updated` };
  }




  existing(id: number) {
    return this.rentsRepository.findOne({
      where: {
        id
      }
    })
  }
}
