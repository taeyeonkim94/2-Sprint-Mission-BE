import ErrorMessage from '@/common/enums/error.message.enums';
import { UnauthorizedError } from '@/common/errors/CustomError';
import { JwtService } from '@/jwt/jwt.service';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];

    const requiredPaths = [{ path: '/products', method: 'POST' }];
    const isRequired = requiredPaths.some(
      (route) => request.path === route.path && request.method === route.method,
    );
    if (!isRequired) return true;

    if (!token)
      throw new UnauthorizedError(ErrorMessage.TOKEN_UNAUTHORIZED_NOTFOUND);
    const user = this.jwtService.validateAccessToken(token);
    if (!user)
      throw new UnauthorizedError(ErrorMessage.TOKEN_UNAUTHORIZED_VALIDATION);

    request.user = user;
    return true;
  }
}
