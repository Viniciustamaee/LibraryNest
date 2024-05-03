import { CategoryType } from 'src/graphQL/categories/typs/category.type';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { AuthorEntity } from 'src/authors/entity/authors.entity';


@ObjectType()
export class BookType {

    @Field(() => ID)
    id: number;

    
    @Field()
    title: string;

    @Field()
    quantity_available: number;

    @Field()
    img: string;

  
    @Field()
    description: string;

   
    @Field(() => CategoryType)
    category: CategoryType;


    @Field(() => AuthorEntity)
    author: AuthorEntity;
}
