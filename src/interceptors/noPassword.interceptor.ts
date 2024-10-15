import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
  } from '@nestjs/common';
  import { Observable } from 'rxjs';
  import { map } from 'rxjs/operators';
  
  @Injectable()
  export class ExcludePasswordInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      return next.handle().pipe(
        map((user) => {
          if (Array.isArray(user)) {
            return user.map(({ password,role , confirmPassword, ...userNoPassword }) => userNoPassword);
          } else if (user && typeof user === 'object') {
            const { password, role, confirmPassword, ...userNoPassword } = user;
            return userNoPassword;
          }
          return user;
        }),
      );
    }
  }