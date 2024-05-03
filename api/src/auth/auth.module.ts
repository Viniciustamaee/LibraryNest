import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { UsersModule } from "src/users/users.module";
import { AuthService } from "./auth.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import * as dotenv from 'dotenv';
import { AuthResolver } from "../graphQL/auth/resolver/auth.resolver";
import { UserEntity } from "src/users/entity/users.entity";
dotenv.config();

@Module({
    imports: [
        JwtModule.register({
            secret: process.env.JWT_SECRET
        }),
        UsersModule,
        TypeOrmModule.forFeature([UserEntity])

    ],
    providers: [AuthService, 
        AuthResolver],
    exports: [AuthModule]
})

export class AuthModule {

}
