import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class UserType {

    @Field(()=> ID)
    id: number;
    
    @Field()
    email: string;

    @Field()
    username: string

    @Field()
    password: string;

    @Field()
    img: string;

    @Field()
    description: string;

    @Field()
    admin: 0 | 1;
}
