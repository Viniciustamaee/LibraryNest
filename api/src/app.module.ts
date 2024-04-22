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
import { AuthModule } from './auth/auth.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { ConfigModule } from '@nestjs/config';



@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    UsersModule,
    BooksModule,
    RentsModule,
    AuthorsModule,
    ReviewsModule,
    CategoriesModule,
    AuthModule,
    CloudinaryModule,

    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [
        AuthorEntity,
        BookEntity,
        CategoryEntity,
        RentEntity,
        ReviewEntity,
        UserEntity
      ],
      synchronize: false,
    })],

  controllers: [AppController],
  providers: [AppService],
})

export class AppModule { }
