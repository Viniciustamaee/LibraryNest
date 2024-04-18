import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: "categories"
})
export class CategoryEntity {

    @PrimaryGeneratedColumn({
        unsigned: true
    })
    id: number;

    @Column({
        type: "varchar",
        length: 63,
        unique: true
    })
    category_name: string


}
