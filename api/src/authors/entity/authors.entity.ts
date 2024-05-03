import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: 'authors'
})
@ObjectType()
export class AuthorEntity {
    @PrimaryGeneratedColumn({
        type: "int"
    })
    @Field(()=> ID)
    id: number;

    @Column({
        unique: true,
        length: 143
    })
    @Field()
    name: string;
}
