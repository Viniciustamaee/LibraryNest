import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { BooksService } from './books.service';
import { AuthGuard } from '../guards/auth.guard';
import { CloudinaryService } from '../cloudinary/cloudinary.service';

@Controller('books')
export class BooksController {
  constructor(
    private readonly booksService: BooksService,
    private readonly cloudinaryService: CloudinaryService
  ) { }


  @Post()
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('img'))
  async create(@Body() body: CreateBookDto, @UploadedFile() file: Express.Multer.File) {
    const imgUrl = await this.cloudinaryService.uploadImage(file);
    const book = await this.booksService.create({ ...body, img: imgUrl });
    return book;
  }

  @Get()
  findAll() {
    return this.booksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.booksService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('img'))
  async update(@Param('id') id: string, @Body() data: UpdateBookDto, @UploadedFile() file?: Express.Multer.File) {
    let imgUrl;
    if (file) {
      imgUrl = await this.cloudinaryService.uploadImage(file);
    }

    return this.booksService.update(+id, { ...data, img: imgUrl });
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string) {
    return this.booksService.remove(+id);
  }


  @Post('teste')
  @UseInterceptors(FileInterceptor('img'))
  async teste(@UploadedFile() img: Express.Multer.File) {
    const imgUrl = await this.cloudinaryService.uploadImage(img);
    return { imgUrl };
  }

}
