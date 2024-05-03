import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ReviewsService } from 'src/reviews/reviews.service';
import { InputReview } from '../input/reviews.input';
import { ReviewEntity } from 'src/reviews/entity/reviews.entity';


@Resolver('Review')
export class ReviewsResolver {
  constructor(private readonly reviewsService: ReviewsService) { }

  @Mutation(() => ReviewEntity)
  async createReview(@Args('data') data: InputReview) {
    return this.reviewsService.create(data);
  }

  @Query(() => [ReviewEntity])
  async reviews() {
    return this.reviewsService.findAll();
  }

  @Query(() => [ReviewEntity])
  async reviewsByBookId(@Args('id') id: string) {
    return await this.reviewsService.findOne(+id);
  }


  @Mutation(() => ReviewEntity)
  async deleteReview(@Args('id') id: string) {
    return this.reviewsService.remove(+id);
  }
}
