import { Body, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async getCategories() {
    const categories = await this.prisma.category.findMany();

    if (!categories || categories.length == 0) {
      throw new HttpException('No users found', HttpStatus.NOT_FOUND);
    }

    return categories;
  }

  async createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    try {
      // Get the user by the ID
      const category = await this.prisma.category.create({
        data: {
          name: createCategoryDto.name,
          userId: Number(createCategoryDto.userId),
        },
      });

      return category;
    } catch (err) {
      console.log(err);
      throw new HttpException(
        'Impossible to create the category',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
