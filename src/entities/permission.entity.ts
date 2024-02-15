import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { RoleEntity } from './role.entity';
import { Action, Resource } from 'src/types/permissions';

@Entity({ name: 'permissions' })
export class PermissionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: Action,
  })
  actionType: Action;

  @Column({
    type: 'enum',
    enum: Resource,
  })
  resourceType: Resource;

  @ManyToMany(() => RoleEntity, (role) => role.assignedPermissions)
  roles: RoleEntity[];
}
