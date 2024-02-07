import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ProfileService } from 'src/controllers/profile/profile.service';
import { Action, Resource } from 'src/types/permissions';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private profileService: ProfileService,
  ) {}

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
    if (isPublic) return true;

    const skipPermissions = this.reflector.getAllAndOverride<boolean>(
      'SKIP_PERMISSION',
      [handler, controller],
    );
    if (skipPermissions) return true;

    const permissions = await this.profileService.findPermissions(req.user.sub);

    return permissions.includes(`${prefix}:${Action[req.method]}`);
  }
}
