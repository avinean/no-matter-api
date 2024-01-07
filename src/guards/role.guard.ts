import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UsersService } from 'src/routes/users/users.service';
import { Role } from 'src/types/role';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private userService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const allowedRoles = this.reflector.getAllAndOverride<Role[]>('ROLE', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!allowedRoles) return true;

    const {
      user: { sud },
    } = context.switchToHttp().getRequest();

    return sud.some((role) => allowedRoles.includes(role));
  }
}
