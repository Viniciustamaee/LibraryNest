import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorsModule } from '../authors/authors.module';
import { CategoriesModule } from '../categories/categories.module';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { BookEntity } from './entity/books.entity';
import { BookResolver } from 'src/graphQL/book/resolver/book.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([BookEntity]),
    AuthorsModule,
    CategoriesModule,
    CloudinaryModule
  ],
  providers: [BooksService, BookResolver],
  exports: [BooksService]
})
export class BooksModule { }
