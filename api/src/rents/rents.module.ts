import { Module } from '@nestjs/common';
import { RentsService } from './rents.service';
import { RentsController } from './rents.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RentEntity } from './entities/rent.entity';
import { BooksModule } from 'src/books/books.module';

@Module({
  imports: [TypeOrmModule.forFeature([RentEntity]),
    BooksModule],
  controllers: [RentsController],
  providers: [RentsService],
})
export class RentsModule { }
