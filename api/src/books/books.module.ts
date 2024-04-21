import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookEntity } from './entities/book.entity';
import { AuthorsModule } from 'src/authors/authors.module';
import { CategoriesModule } from 'src/categories/categories.module';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([BookEntity]),
    AuthorsModule,
    CategoriesModule,
    CloudinaryModule
  ],
  controllers: [BooksController],
  providers: [BooksService],
  exports: [BooksService]
})
export class BooksModule { }
