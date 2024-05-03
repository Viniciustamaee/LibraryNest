import { ObjectType, Field } from '@nestjs/graphql';
import { UserEntity } from 'src/users/entity/users.entity';

@ObjectType()
export class AuthPayload {
    @Field()
    accessToken: string;

    @Field(() => UserEntity)
    user: UserEntity;
}
