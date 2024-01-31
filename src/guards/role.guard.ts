import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from 'src/types/enums';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const allowedRoles = this.reflector.getAllAndOverride<Role[]>('ROLE', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!allowedRoles) return true;

    const {
      user: { sud },
    } = context.switchToHttp().getRequest();

    return sud.some(
      (role) =>
        [Role.admin, Role.owner].includes(role) || allowedRoles.includes(role),
    );
  }
}
