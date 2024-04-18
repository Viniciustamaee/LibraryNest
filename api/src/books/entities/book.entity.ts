import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { CategoryEntity } from 'src/categories/entities/category.entity';
import { AuthorEntity } from 'src/authors/entities/author.entity';

@Entity({
    name: "books"
})
export class BookEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        length: 255,
        unique: true
    })
    title: string;

    @Column({
        type: 'int'
    })
    quantity_available: number;

    @Column({
        type: 'longtext'
    })
    img: string;

    @Column({
        type: 'varchar',
        length: 255
    })
    description: string;

    @ManyToOne(() => CategoryEntity)
    @JoinColumn({ name: 'category_id' })
    category: CategoryEntity;

    @ManyToOne(() => AuthorEntity, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'author_id' })
    author: AuthorEntity;
}
