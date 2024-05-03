import { Controller, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { CloudinaryService } from "./cloudinary.service";

@Controller('Cloud')
export class CloudController {
    constructor(
        private readonly cloudinaryService: CloudinaryService
    ) { }

    @Post()
    @UseInterceptors(FileInterceptor('img'))
    async create(@UploadedFile() file: Express.Multer.File) {
        const imgUrl = await this.cloudinaryService.uploadImage(file);
        return imgUrl;
    }

}

