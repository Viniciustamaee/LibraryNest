import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { BooksService } from 'src/books/books.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { UseGuards } from '@nestjs/common';
import { BookEntity } from 'src/books/entity/books.entity';
import { inputBook } from '../input/book.input';

@Resolver('Book')
export class BookResolver {
    constructor(
        private readonly booksService: BooksService,
        private readonly cloudinaryService: CloudinaryService,
    ) { }

    @Mutation(() => BookEntity)
    async createBook(
        @Args('data') data: inputBook,
    ) {
        const book = await this.booksService.create({ ...data });
        return book;
    }

    @Query(() => [BookEntity])
    async books() {
        return this.booksService.findAll();
    }

    @Query(() => BookEntity)
    async book(@Args('id') id: number) {
        return this.booksService.findOne(id);
    }

    @Mutation(() => BookEntity)
    async updateBook(
        @Args('id') id: string,
        @Args('input') input: inputBook,
    ) {
        return this.booksService.update(+id, { ...input, });
    }

    @Mutation(() => BookEntity)
    async removeBook(@Args('id') id: string) {
        return this.booksService.remove(+id);
    }

}
