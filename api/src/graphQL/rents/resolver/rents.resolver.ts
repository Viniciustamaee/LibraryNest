import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { RentsService } from '../../../rents/rents.service';
import { RentEntity } from '../../../rents/entity/rent.entity';
import { InputtRents } from '../inputs/create-rent.dto';

@Resolver(() => RentEntity)
export class RentsResolver {
  constructor(private readonly rentsService: RentsService) { }

  @Mutation(() => RentEntity)
  async createRent(@Args('input') input: InputtRents) {
    return this.rentsService.create(input);
  }

  @Query(() => [RentEntity])
  async rents() {
    return this.rentsService.findAll();
  }

  @Query(() => RentEntity)
  async rent(@Args('id') id: string) {
    return this.rentsService.findOne(+id);
  }

  @Query(() => RentEntity)
  async rentOne(@Args('id') id: string) {
    return await this.rentsService.findOneRents(+id);;
  }


  @Mutation(() => RentEntity) async updateRent(
    @Args('id') id: string,
    @Args('input') input: InputtRents): Promise<RentEntity> {
    return this.rentsService.update(+id, input);
  }

  @Mutation(() => RentEntity)
  async deleteRent(@Args('id') id: string) {
    return this.rentsService.remove(+id);
  }
}
