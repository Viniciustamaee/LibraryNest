import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly cloudinaryService: CloudinaryService

    ) { }

  @Post()
  @UseInterceptors(FileInterceptor('img')) 
  async create(@Body() data: CreateUserDto,@UploadedFile() file: Express.Multer.File) {
    const imgUrl = await this.cloudinaryService.uploadImage(file);
    const book = await this.usersService.create({ ...data, img: imgUrl });
    return book;
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('img')) 
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto, @UploadedFile() file?: Express.Multer.File) {
    let imgUrl;
    if (file) {
      imgUrl = await this.cloudinaryService.uploadImage(file);
    }
    return this.usersService.update(+id, { ...updateUserDto, img: imgUrl });
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
