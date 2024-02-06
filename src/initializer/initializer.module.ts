import { Module } from '@nestjs/common';
import { InitializerService } from './initializer.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleEntity } from 'src/entities/role.entity';
import { PermissionEntity } from 'src/entities/permission.entity';

@Module({
  providers: [InitializerService],
  imports: [TypeOrmModule.forFeature([RoleEntity, PermissionEntity])],
})
export class InitializerModule {}
