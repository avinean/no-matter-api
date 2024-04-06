// import {
//   CanActivate,
//   ExecutionContext,
//   Injectable,
//   UnauthorizedException,
// } from '@nestjs/common';
// import { Reflector } from '@nestjs/core';
// import { BusinessObjectService } from 'src/controllers/business-object/business-object.service';
// import { BusinessService } from 'src/controllers/business/business.service';

// @Injectable()
// export class PropertyGuard implements CanActivate {
//   constructor(
//     private reflector: Reflector,
//     private businessService: BusinessService,
//     private businessObjectService: BusinessObjectService,
//   ) {}

//   async canActivate(context: ExecutionContext) {
//     console.log('PropertyGuard');
//     const isPublic = this.reflector.getAllAndOverride<boolean>('IS_PUBLIC', [
//       context.getHandler(),
//       context.getClass(),
//     ]);
//     if (isPublic) return true;

//     const {
//       user: { sub },
//       params: { businessId, businessObjectId },
//     } = context.switchToHttp().getRequest();
//     const checks = [];
//     if (businessId)
//       checks.push(this.isOwnsOrBelongsToBusiness(sub, businessId));
//     if (businessObjectId)
//       checks.push(this.isOwnsOrBelongsToBusinessObject(sub, businessObjectId));
//     await Promise.all(checks);
//     return true;
//   }

//   async isOwnsOrBelongsToBusiness(sub: number, businessId: number) {
//     const business = await this.businessService.findOne({
//       select: ['id'],
//       where: { id: businessId, owner: { user: { id: sub } } },
//     });
//     if (!business) throw new UnauthorizedException();
//   }

//   async isOwnsOrBelongsToBusinessObject(sub: number, businessObjectId: number) {
//     const object = await this.businessObjectService.findOne({
//       select: ['id'],
//       where: [
//         { id: businessObjectId, createdBy: { user: { id: sub } } },
//         { id: businessObjectId, employees: { user: { id: sub } } },
//       ],
//     });
//     if (!object) throw new UnauthorizedException();
//   }
// }
