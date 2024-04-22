import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ReviewEntity } from './entities/review.entity';
import { Repository } from 'typeorm';
import { BooksService } from 'src/books/books.service';
import { UsersService } from 'src/users/users.service';


@Injectable()
export class ReviewsService {

  constructor(
    @InjectRepository(ReviewEntity)
    private reviewsRepository: Repository<ReviewEntity>,
    private readonly bookService: BooksService,
    private readonly userService: UsersService,
  ) { }

  async create({ book_id, rating, user_id, comment }: CreateReviewDto) {

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
    const allReviews = await this.reviewsRepository.find({ relations: ['book', 'user'] });

    const reviewsWithMatchingBookId = allReviews.filter(review => review.book.id === id);

    if (reviewsWithMatchingBookId.length === 0) {
        throw new NotFoundException(`No reviews found for book with ID ${id}`);
    }

    return reviewsWithMatchingBookId;
}


  async remove(id: number) {
    const existingReview = await this.reviewsRepository.findOne({
      where: { id },
      relations: ['book']
    });
  
    if (!existingReview) {
      throw new NotFoundException(`Review with ID ${id} not found`);
    }
  
    const deleteBook = await this.reviewsRepository.delete({ id });
  
    return deleteBook;
  }
  


  existing(id: number) {
    return this.reviewsRepository.findOne({
      where: {
        id
      }
    })
  }
}
