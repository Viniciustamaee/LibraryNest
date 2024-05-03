import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CategoriesService } from 'src/categories/categories.service';
import { CategoryType } from '../typs/category.type';
import { CreateCategoryArgs } from '../args/category.args';
import { CreateCategoryInput } from '../input/category.input';


@Resolver(() => CategoryType)
export class CategoriesResolver {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Query(() => [CategoryType])
  async categories() {
    return this.categoriesService.findAll();
  }

  @Query(() => CategoryType)
  async category(@Args('id', { type: () => Int }) id: number) {
    const category = await this.categoriesService.findOne(id);
    return category;
  }

  @Mutation(() => CategoryType)
  async createCategory(@Args() args: CreateCategoryArgs): Promise<CategoryType> { 
    return this.categoriesService.create(args.data);
  }

  @Mutation(() => CategoryType)
  async updateCategory(
    @Args('id', { type: () => Int }) id: number,
    @Args('category') category: CreateCategoryInput,
  ) {
    const updatedCategory = await this.categoriesService.update(id, category);
    return updatedCategory;
  }

  @Mutation(() => CategoryType)
  async removeCategory(@Args('id', { type: () => Int }) id: number) {
    const deletedCategory = await this.categoriesService.remove(id);
    return deletedCategory;
  }
}
