import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { BussinessObjectService } from 'src/controllers/bussiness-object/bussiness-object.service';
import { BussinessService } from 'src/controllers/bussiness/bussiness.service';
import { UserService } from 'src/controllers/user/user.service';

@Injectable()
export class PropertyGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private bussinessService: BussinessService,
    private bussinessObjectService: BussinessObjectService,
    private userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>('IS_PUBLIC', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;

    const {
      user: { sub },
      params: { bussinessId, bussinessObjectId },
    } = context.switchToHttp().getRequest();
    const checks = [];
    if (bussinessId) checks.push(this.isOwnsBussiness(sub, bussinessId));
    if (bussinessObjectId)
      checks.push(this.isOwnsBussinessObject(sub, bussinessObjectId));
    await Promise.all(checks);
    return true;
  }

  async isOwnsBussiness(sub: number, bussinessId: number) {
    const bussiness = await this.bussinessService.findOne({
      select: ['id'],
      where: { id: bussinessId, profile: { user: { id: sub } } },
    });
    if (!bussiness) throw new UnauthorizedException();
  }

  async isOwnsBussinessObject(sub: number, bussinessObjectId: number) {
    const object = await this.bussinessObjectService.findOne({
      select: ['id'],
      where: { id: +bussinessObjectId, profile: { user: { id: sub } } },
    });
    if (!object) throw new UnauthorizedException();
  }
}
