import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { CategoryEntity } from '../../categories/entities/category.entity';
import { AuthorEntity } from '../../authors/entities/author.entity';

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


    @JoinColumn({ name: 'category_id' })
    @ManyToOne(() => CategoryEntity)
    category: CategoryEntity;

    @JoinColumn({ name: 'author_id' })
    @ManyToOne(() => AuthorEntity, { onDelete: 'CASCADE' })
    author: AuthorEntity;
}
