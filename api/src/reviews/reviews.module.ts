import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { BooksModule } from 'src/books/books.module';
import { ReviewEntity } from './entity/reviews.entity';
import { ReviewsResolver } from 'src/graphQL/reviews/resolver/reviews.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([ReviewEntity]),
    UsersModule,
    BooksModule
  ],
  providers: [
    ReviewsService,
    ReviewsResolver
  ],
})
export class ReviewsModule { }
