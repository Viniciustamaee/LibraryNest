import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { AuthLoginDTO } from "./dto/login-auth.dto";
import { AuthService } from "./auth.service";
import { AuthGuard } from "src/guards/auth.guard";

@Controller('auth')
export class authController {

    constructor(private readonly authService: AuthService) { }

    @Post('login')
    async login(@Body() {password, username}: AuthLoginDTO) {
        return this.authService.login(password,username);

    }

    @UseGuards(AuthGuard)
    @Post('me')
    async me(){
        return {me:"ok"}
    }

}
