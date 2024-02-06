import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PermissionEntity } from 'src/entities/permission.entity';
import { RoleEntity } from 'src/entities/role.entity';
import { Action, Resource } from 'src/types/permissions';
import { Role } from 'src/types/roles';
import { Repository } from 'typeorm';

@Injectable()
export class InitializerService implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
    @InjectRepository(PermissionEntity)
    private readonly permissionRepository: Repository<PermissionEntity>,
  ) {}

  async onApplicationBootstrap() {
    await this.initializeRoles();
    await this.initializePermissions();
    await this.initializeRolePermissions();
  }

  async initializeRoles() {
    const existingRoles = await this.roleRepository.find();

    if (existingRoles.length === 0) {
      const rolesToCreate = [];

      rolesToCreate.push({ name: Role.admin });
      await this.roleRepository.save(rolesToCreate);
    }
  }

  async initializePermissions() {
    const existingRoles = await this.permissionRepository.find();

    if (existingRoles.length === 0) {
      const permissionsToCreate = [];

      for (const resource in Resource) {
        if (isNaN(parseInt(resource, 10))) {
          for (const action in Action) {
            if (isNaN(parseInt(action, 10))) {
              permissionsToCreate.push({
                action: Action[action],
                resource: Resource[resource],
              });
            }
          }
        }
      }
      await this.permissionRepository.save(permissionsToCreate);
    }
  }

  async initializeRolePermissions() {
    const roles = await this.roleRepository.find();
    const permissions = await this.permissionRepository.find();

    for (const role of roles) {
      if (role.name === Role.admin) {
        role.permissions = permissions;
      }

      await this.roleRepository.save(role);
    }
  }
}
