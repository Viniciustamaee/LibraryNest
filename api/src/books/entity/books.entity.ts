import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { CategoryEntity } from 'src/categories/entity/category.entity';
import { AuthorEntity } from 'src/authors/entity/authors.entity';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@Entity({
    name: "books"
})
@ObjectType()
export class BookEntity {

    @PrimaryGeneratedColumn()
    @Field(() => ID)
    id: number;

    @Column({
        type: 'varchar',
        length: 255,
        unique: true
    })
    @Field()
    title: string;

    @Column()
    @Field()
    quantity_available: number;

    @Column({
        type: 'longtext'
    })
    @Field()
    img: string;

    @Column({
        type: 'varchar',
        length: 255
    })
    @Field()
    description: string;

    @JoinColumn({ name: 'category_id' })
    @ManyToOne(() => CategoryEntity)
    @Field(() => CategoryEntity)
    category: CategoryEntity;

    @ManyToOne(() => AuthorEntity, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'author_id' })
    @Field(() => AuthorEntity)
    author: AuthorEntity;
}
