import { Module } from '@nestjs/common';
import { RentsService } from './rents.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RentEntity } from './entity/rent.entity';
import { BooksModule } from 'src/books/books.module';
import { UsersModule } from 'src/users/users.module';
import { RentsResolver } from '../graphQL/rents/resolver/rents.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([RentEntity]),
    BooksModule,
    UsersModule
  ],
  providers: [RentsService,
    RentsResolver
  ],
})
export class RentsModule { }
