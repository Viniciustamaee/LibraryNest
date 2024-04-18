import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { BooksModule } from './books/books.module';
import { RentsModule } from './rents/rents.module';
import { AuthorsModule } from './authors/authors.module';
import { ReviewsModule } from './reviews/reviews.module';
import { CategoriesModule } from './categories/categories.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryEntity } from './categories/entities/category.entity';
import { BookEntity } from './books/entities/book.entity';
import { RentEntity } from './rents/entities/rent.entity';
import { AuthorEntity } from './authors/entities/author.entity';
import { ReviewEntity } from './reviews/entities/review.entity';
import { UserEntity } from './users/entities/user.entity';


@Module({
  imports: [UsersModule, BooksModule, RentsModule, AuthorsModule, ReviewsModule, CategoriesModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: "mysql",
      port: 3306,
      username: "root",
      password: "root",
      database: "api",

      entities: [
        AuthorEntity,
        BookEntity,
        CategoryEntity,
        RentEntity,
        ReviewEntity,
        UserEntity
      ],
      synchronize: true,
    })],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule { }
