import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export default class JwtGuard extends AuthGuard('jwt') {
    
    public canActivate(context: ExecutionContext) {
        const client = context.switchToHttp().getRequest();
        const token =  this.getToken(context, client);
        return super.canActivate(context);
    }
    
    handleRequest(error, user, info) {
        if (error || !user) {
            throw error || new UnauthorizedException();
        }
        return user;
    }

    private getToken(ctx: ExecutionContext, client:any){
        const authorization = client.headers.authorization?.split(' ');

        if(!authorization) {
            this.throwException(ctx, 'Token not found');
        }

        if (authorization[0].toLowerCase() !== 'bearer') {
            this.throwException(ctx, 'Authorization type not valid');
        }

        if (!authorization[1]) {
            this.throwException(ctx, 'Token not provided');
        }
      
        return authorization[1];
      
    }

    private throwException(ctx: ExecutionContext, message: string) {    
        throw new UnauthorizedException(message);
    }
  
}
