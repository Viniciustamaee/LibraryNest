import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';

@Injectable()
export class CloudinaryService {
  constructor() {
    cloudinary.config({
      cloud_name: 'dtuxy5k7v',
      api_key: '631759363798366',
      api_secret: 'j3AdG6dgyludTedwZB2zQKBws54',
      folder: 'Nest'
    });
  }

  async uploadImage(img: any): Promise<string> {
    const imgBase64 = img.buffer.toString('base64'); 
    const result = await cloudinary.uploader.upload(`data:${img.mimetype};base64,${imgBase64}`); 

    if (!result || !result.secure_url) {
      throw new Error('Failed to upload image to Cloudinary');
    }

    return result.secure_url;
  }
}
