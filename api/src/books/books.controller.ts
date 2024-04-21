import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { Multer } from 'multer'; // Importe Multer diretamente
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('books')
export class BooksController {
  constructor(
    private readonly booksService: BooksService,
    private readonly cloudinaryService: CloudinaryService
  ) { }

  @Post()
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('img')) // Interceptador para o campo 'img' do corpo da requisição
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
  update(@Param('id') id: string, @Body() data: UpdateBookDto) {
    return this.booksService.update(+id, data);
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
