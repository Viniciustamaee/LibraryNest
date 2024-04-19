import { Injectable } from '@nestjs/common';
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

  findAll() {
    return `This action returns all reviews`;
  }

  findOne(id: number) {
    return `This action returns a #${id} review`;
  }

  update(id: number, updateReviewDto: UpdateReviewDto) {
    return `This action updates a #${id} review`;
  }

  remove(id: number) {
    return `This action removes a #${id} review`;
  }
}
