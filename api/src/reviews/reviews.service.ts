import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ReviewEntity } from './entities/review.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ReviewsService {

  constructor(
    @InjectRepository(ReviewEntity)
    private reviewsRepository: Repository<ReviewEntity>
  ) { }

  async create({ book_id, rating, user_id, comment }: CreateReviewDto) {

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

    const existingReview = await this.existing(id);

    if (!existingReview) {
      throw new NotFoundException(`Review with ID ${id} not found`);
    }


    const oneReview = await this.reviewsRepository.findOne({ where: { id }, relations: ['book', 'user'] })


    return oneReview;
  }


  async remove(id: number) {
    const existingReview = await this.existing(id);

    if (!existingReview) {
      throw new NotFoundException(`Review with ID ${id} not found`);
    }

    const deleteBook = await this.reviewsRepository.delete({ id })

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
