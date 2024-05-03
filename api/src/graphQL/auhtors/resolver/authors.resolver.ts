import { Args, ID, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import { AuthorsService } from "src/authors/authors.service";
import { createAuthorInputs } from "../input/category.input";
import { AuthorEntity } from "src/authors/entity/authors.entity";


@Resolver(() => AuthorEntity)
export class AuthorResovler {
  constructor(private readonly auhtorService: AuthorsService) { }


  @Mutation(() => AuthorEntity)
  async createAuthor(@Args('createAuthorInput') createAuthorInput: createAuthorInputs) {
    return this.auhtorService.create(createAuthorInput);
  }

  @Query(() => [AuthorEntity])
  async author() {
    return this.auhtorService.findAll()
  }

  @Query(() => AuthorEntity)
  async authorOne(@Args('id', { type: () => Int }) id: number) {
    const author = await this.auhtorService.findOne(id);
    return author;
  }

  @Mutation(() => AuthorEntity)
  async updateAuthor(
    @Args('id', { type: () => Int }) id: number,
    @Args('updateAuthorInput') updateAuthorInput: createAuthorInputs,
  ) {
    const updatedAuthor = await this.auhtorService.update(id, updateAuthorInput);
    return updatedAuthor;
  }

  @Mutation(() => AuthorEntity)
  async removeAuthor(@Args('id', { type: () => Int }) id: number): Promise<AuthorEntity> {
      const deletedAuthor = await this.auhtorService.remove(id);
      return deletedAuthor; 
  }
  


}