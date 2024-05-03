import { createAuthorInputs } from 'src/graphQL/auhtors/input/category.input';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { UsersService } from 'src/users/users.service';
import { CreateUsersInput } from '../input/user.input';
import { UserEntity } from 'src/users/entity/users.entity';

@Resolver(() => UserEntity)
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly cloudinaryService: CloudinaryService,
  ) { }


  @Mutation(() => UserEntity)
  async createUser(
    @Args('data') data: CreateUsersInput,
  ) {
    let imgUrl;
    if (data.img) {
      imgUrl = await this.cloudinaryService.uploadImage(data.img);
    }
    const user = await this.usersService.create({ ...data, img: imgUrl });
    return user;
  }


  @Query(() => [UserEntity])
  async users() {
    return this.usersService.findAll();
  }

  @Query(() => UserEntity)
  async user(@Args('id', { type: () => Int }) id: number) {
    const user = await this.usersService.findOne(id);
    return user;
  }

  @Mutation(() => UserEntity)
  async updateUser(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateUserInput') updateUserInput: CreateUsersInput,
  ) {

    const imgUrl = await this.cloudinaryService.uploadImage(updateUserInput.img);

    return this.usersService.update(id, { ...updateUserInput, img: imgUrl });
  }

  @Mutation(() => UserEntity)
  async removeUser(@Args('id', { type: () => Int }) id: number) {
    const deletedUser = await this.usersService.remove(id);
    return deletedUser;
  }
}
