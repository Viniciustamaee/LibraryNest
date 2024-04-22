import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {

  constructor(
    @InjectRepository(CategoryEntity)
    private categoryRepository: Repository<CategoryEntity>
  ) { }

  async create({ category_name }: CreateCategoryDto) {
    const existingCategories = await this.categoryRepository.findOne({
      where: {
        category_name: category_name
      }
    })

    if (existingCategories) {
      return "Exist the Category"
    }

    const newCategory = await this.categoryRepository.create({ category_name });

    return await this.categoryRepository.save(newCategory);
  }

  async findAll() {
    const allCategories = await this.categoryRepository.find()
    return allCategories;
  }

  async findOne(id: number) {
    const existingCategories = await this.existing(id)

    if (!existingCategories) {
      throw new NotFoundException(`Categorie with ID ${id} not found`);
    }


    const oneCategory = await this.categoryRepository.findOne({ where: { id } })
    return oneCategory;
  }

  async update(id: number, { category_name }: UpdateCategoryDto) {

    const existingCategories = await this.existing(id)

    if (!existingCategories) {
      throw new NotFoundException(`Categorie with ID ${id} not found`);
    }

    await this.categoryRepository.update(id, { category_name });

    const updatedCategory = await this.categoryRepository.findOne({ where: { id } });

    return updatedCategory;
  }

  async remove(id: number) {

    const existingCategories = await this.existing(id)

    if (!existingCategories) {
      throw new NotFoundException(`Categorie with ID ${id} not found`);
    }

    const deleteCategory = await this.categoryRepository.delete({ id })

    return deleteCategory;
  }


  existing(id: number) {
    return this.categoryRepository.findOne({
      where: {
        id
      }
    })
  }
}
