import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { RentsService } from './rents.service';
import { CreateRentDto } from './dto/create-rent.dto';
import { UpdateRentDto } from './dto/update-rent.dto';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('rents')
export class RentsController {
  constructor(private readonly rentsService: RentsService) { }

  @Post()
  create(@Body() { book_id, due_date, rented_date, user_id }: CreateRentDto) {
    return this.rentsService.create({ book_id, due_date, rented_date, user_id });
  }

  @Get()
  findAll() {
    return this.rentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rentsService.findOne(+id);
  }

  @Get(':id/one')
  findOneRents(@Param('id') id: string) {
    return this.rentsService.findOneRents(+id)
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  update(@Param('id') id: string, @Body() data: UpdateRentDto) {
    return this.rentsService.update(+id, data);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string) {
    return this.rentsService.remove(+id);
  }
}
