import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";

@Injectable()
export class AuthGuard implements CanActivate {
    canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        const authorizationHeader = request.headers['authorization'];

        if (!authorizationHeader) {
            
            throw new UnauthorizedException('Without authorization');
        }

        const [authType, token] = authorizationHeader.split(' ');
        if (authType !== 'Bearer' || !token) {
          
            throw new UnauthorizedException('Without authorization');
        }


        return true;
    }
}
