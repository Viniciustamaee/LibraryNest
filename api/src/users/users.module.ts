import { UsersResolver } from 'src/graphQL/users/resolver/user.resolver';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { Module } from '@nestjs/common';
import { UserEntity } from './entity/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]),
  CloudinaryModule
],
  providers: [UsersService, UsersResolver],
  exports: [UsersService]
})
export class UsersModule { }
