import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Action, Resource } from 'src/types/permissions';
import { Role } from 'src/types/roles';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    console.log('PermissionGuard');
    const handler = context.getHandler();
    const controller = context.getClass();
    const req = context.switchToHttp().getRequest();
    const prefix = Reflect.getMetadata('resource', controller) as Resource;

    const isPublic = this.reflector.getAllAndOverride<boolean>('IS_PUBLIC', [
      handler,
      controller,
    ]);
    console.log('isPublic', isPublic);
    if (isPublic) return true;

    const skipPermissions = this.reflector.getAllAndOverride<boolean>(
      'SKIP_PERMISSION',
      [handler, controller],
    );
    if (skipPermissions) return true;

    // if (req.user.sud.some(({ name }) => name === Role.admin)) return true;

    console.log(req.user);

    // return this.hasPermission(context);
  }
}
