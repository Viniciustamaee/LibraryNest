import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BooksService } from '../books/books.service';
import { UsersService } from '../users/users.service';
import { RentEntity } from './entity/rent.entity';
import { InputtRents } from 'src/graphQL/rents/inputs/create-rent.dto';


@Injectable()
export class RentsService {

  constructor(
    @InjectRepository(RentEntity)
    private rentsRepository: Repository<RentEntity>,
    private readonly booksService: BooksService,
    private readonly userService: UsersService

  ) { }

  async create({ due_date, book_id, rented_date, user_id }: InputtRents) {
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

    const updateData: any = { quantity_available: book.quantity_available };
    if (book.category) {
      updateData.category_id = book.category.id;
    }
    if (book.author) {
      updateData.author_id = book.author.id;
    }

    await this.booksService.update(book_id, updateData);

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
    const allRents = await this.rentsRepository.find({ relations: ['book', 'user'] });
    const rentsWithMatchingBookId = allRents.find(rent => rent.user && rent.user.id === id);

    if (!rentsWithMatchingBookId) {
      throw new NotFoundException(`No reviews found for book with ID ${id}`);
    }

    return rentsWithMatchingBookId;
  }



  async findOneRents(id: number) {
    const oneRent = await this.rentsRepository.findOne({
      where: { id },
      relations: ['book', 'user']
    });

    if (!oneRent) {
      throw new NotFoundException(`Rent with ID ${id} not found`);
    }

    return oneRent;
  }


  async update(id: number, data: InputtRents): Promise<RentEntity> {
    const existingRent = await this.rentsRepository.findOne({ where: { id } });
    if (!existingRent) {
      throw new NotFoundException(`Rent with ID ${id} not found`);
    }

    existingRent.rented_date = data.rented_date;
    existingRent.due_date = data.due_date;

    await this.rentsRepository.save(existingRent);

    return existingRent;
  }
  async remove(id: number) {
    const showRents = await this.rentsRepository.findOne({ where: { id }, relations: ['book'] });

    if (!showRents || !showRents.book) {
      throw new NotFoundException(`Rent with ID ${id} not found or does not have associated book`);
    }

    if (showRents.book.quantity_available >= 0) {
      showRents.book.quantity_available += 1;

      const updateData: any = {
        quantity_available: showRents.book.quantity_available,
        category_id: showRents.book.category?.id,
        author_id: showRents.book.author?.id
      };

      await this.booksService.update(showRents.book.id, updateData);
    } else {
      throw new BadRequestException(`Book with ID ${showRents.book.id} is not available for rent`);
    }

    await this.rentsRepository.delete({ id });

    return showRents;
  }





  existing(id: number) {
    return this.rentsRepository.findOne({
      where: {
        id
      }
    })
  }
}
