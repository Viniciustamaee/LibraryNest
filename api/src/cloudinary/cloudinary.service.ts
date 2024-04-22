import { v2 as cloudinary } from 'cloudinary';
import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class CloudinaryService {
  constructor() {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      folder: process.env.CLOUDINARY_FOLDER
    });
  }

  async uploadImage(img: any): Promise<string> {
    if (!img || !img.buffer) {
      

      return img = process.env.IMG_DEFAULT
    }

    const imgBase64 = img.buffer.toString('base64'); 
    const result = await cloudinary.uploader.upload(`data:${img.mimetype};base64,${imgBase64}`); 

    if (!result || !result.secure_url) {
      throw new Error('Failed to upload image to Cloudinary');
    }

    return result.secure_url;
  }
}
