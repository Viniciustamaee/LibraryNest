import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BooksService } from '../books/books.service';
import { UsersService } from '../users/users.service';
import { ReviewEntity } from './entity/reviews.entity';
import { InputReview } from 'src/graphQL/reviews/input/reviews.input';

@Injectable()
export class ReviewsService {

  constructor(
    @InjectRepository(ReviewEntity)
    private reviewsRepository: Repository<ReviewEntity>,
    private readonly bookService: BooksService,
    private readonly userService: UsersService,
  ) { }

  async create({ book_id, rating, user_id, comment }: InputReview) {

    await this.userService.findOne(user_id)
    await this.bookService.findOne(book_id)

    const newReview = this.reviewsRepository.create({
      rating,
      comment,
      book: { id: book_id },
      user: { id: user_id }
    });

    return await this.reviewsRepository.save(newReview);
  }

  async findAll() {
    const allReviews = await this.reviewsRepository.find({ relations: ['book', 'user'] })
    return allReviews
  }

  async findOne(id: number) {
    const reviews = await this.reviewsRepository.find({ relations: ['book', 'user'] });

    if (reviews.length === 0) {
      throw new NotFoundException(`No reviews found for book with ID ${id}`);
    }

    return reviews;
  }

  async remove(id: number) {
    const existingReview = await this.reviewsRepository.findOne({
      where: { id },
      relations: ['book']
    });

    if (!existingReview) {
      throw new NotFoundException(`Review with ID ${id} not found`);
    }

    await this.reviewsRepository.delete({ id });

    return existingReview;
  }



  existing(id: number) {
    return this.reviewsRepository.findOne({
      where: {
        id
      }
    })
  }
}
