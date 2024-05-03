import { Module } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorResovler } from 'src/graphQL/auhtors/resolver/authors.resolver';
import { AuthorEntity } from './entity/authors.entity';



@Module({
  imports: [TypeOrmModule.forFeature([AuthorEntity])],
  providers: [AuthorsService, AuthorResovler],
  exports: [AuthorsService]
})
export class AuthorsModule { }
