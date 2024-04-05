import { Module } from '@nestjs/common';
import { InitializerService } from './initializer.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleEntity } from 'src/controllers/role/role.entity';
import { PermissionEntity } from 'src/controllers/permission/permission.entity';

@Module({
  providers: [InitializerService],
  imports: [TypeOrmModule.forFeature([RoleEntity, PermissionEntity])],
})
export class InitializerModule {}
