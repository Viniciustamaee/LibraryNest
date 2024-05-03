import { Resolver, Mutation, Args, Context } from '@nestjs/graphql';
import { AuthService } from '../../../auth/auth.service';
import { AuthLoginDTO } from '../input/login-auth.dto';
import { AuthPayload } from '../args/auth.payload';

@Resolver()
export class AuthResolver {
    constructor(private readonly authService: AuthService) { }

    @Mutation(() => AuthPayload)
    async login(@Args('input') input: AuthLoginDTO) {
        const { username, password } = input;
        const result = await this.authService.login(username, password);
        return result;
    }

}
