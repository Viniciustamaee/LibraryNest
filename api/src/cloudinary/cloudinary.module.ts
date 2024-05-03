import { Module } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import { CloudController } from './cloudinary.controller';

@Module({
  controllers: [CloudController],
  providers: [CloudinaryService],
  exports: [CloudinaryService],
})
export class CloudinaryModule { }
