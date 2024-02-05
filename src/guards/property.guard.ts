import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { BussinessService } from 'src/controllers/bussiness/bussiness.service';
import { UserService } from 'src/controllers/user/user.service';

@Injectable()
export class PropertyGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
    private bussinessService: BussinessService,
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
    console.log('sub', sub, bussinessId, bussinessObjectId);
    const checks = [];
    if (bussinessId) checks.push(this.isOwnsBussiness(sub, bussinessId));

    if (bussinessObjectId)
      checks.push(this.isOwnsBussiness(sub, bussinessObjectId));
    await Promise.all(checks);
    return true;
  }

  async isOwnsBussiness(sub: number, bussinessId: number) {
    const profile = await this.userService.findOneProfile({
      where: { user: { id: sub } },
    });
    const bussiness = await this.bussinessService.findOne({
      where: { id: bussinessId, profile },
    });
    if (!bussiness) throw new UnauthorizedException();
  }

  async isOwnsBussinessObject(sub: number, bussinessObjectId: number) {
    const profile = await this.userService.findOneProfile({
      where: { user: { id: sub } },
    });
    const object = await this.bussinessService.findOne({
      where: { id: bussinessObjectId, profile },
    });
    if (!object) throw new UnauthorizedException();
  }
}
