import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { UsersModule } from "src/users/users.module";
import { AuthService } from "./auth.service";
import { authController } from "./auth.controller";
import { UserEntity } from "src/users/entities/user.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import * as dotenv from 'dotenv';
dotenv.config();


@Module({
    imports: [
        JwtModule.register({
            secret: process.env.JWT_SECRET
        }),
        UsersModule,
        TypeOrmModule.forFeature([UserEntity]) 

        ],
    controllers: [authController],
    providers: [AuthService]
})

export class AuthModule {
    
}
