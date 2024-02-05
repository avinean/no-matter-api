import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from 'src/types/enums';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>('IS_PUBLIC', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;

    const allowedRoles = this.reflector.getAllAndOverride<(Role | '*')[]>(
      'ROLE',
      [context.getHandler(), context.getClass()],
    ) || [Role.admin, Role.owner];

    if (allowedRoles.includes('*')) return true;

    const {
      user: { sud },
    } = context.switchToHttp().getRequest();

    return sud.some((role) => allowedRoles.includes(role));
  }
}
