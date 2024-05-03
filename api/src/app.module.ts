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

import { RentEntity } from './rents/entity/rent.entity';

import { AuthModule } from './auth/auth.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { ConfigModule } from '@nestjs/config';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { GraphQLModule } from '@nestjs/graphql';
import { AuthorEntity } from './authors/entity/authors.entity';
import { BookEntity } from './books/entity/books.entity';
import { CategoryEntity } from './categories/entity/category.entity';
import { ReviewEntity } from './reviews/entity/reviews.entity';
import { UserEntity } from './users/entity/users.entity';



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

    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),

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
      synchronize: true,
    })],

  controllers: [AppController],
  providers: [AppService],
})

export class AppModule { }
