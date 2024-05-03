import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
import { UserEntity } from "src/users/entity/users.entity";
dotenv.config();



@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(UserEntity)
        private usersRepository: Repository<UserEntity>,
        private readonly jwtService: JwtService,
    ) { }

    async createToken() {
        const payload = { expiresIn: '7 days' };
        const secretKey = process.env.JWT_SECRET;
        const accessToken = this.jwtService.sign(payload, { secret: secretKey });

        return { accessToken };
    }

    async login(username: string,password: string) {
        const existingUser = await this.usersRepository.findOne({
            where: { username }
        });


        if (!existingUser) {
            throw new UnauthorizedException('Username or password wrong.');
        }

        if (!(await bcrypt.compare(password, existingUser.password))) {
            throw new UnauthorizedException('Username or password wrong');
        }


        return { ...(await this.createToken()), user: existingUser };
    }

    async checkToken(token: string) {
        try {
            const decodedToken = this.jwtService.verify(token);
            return decodedToken;
        } catch (error) {
            throw new UnauthorizedException('Invalid token');
        }
    }

}
