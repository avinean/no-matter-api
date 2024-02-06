import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { RoleEntity } from './role.entity';
import { Action, Resource } from 'src/types/permissions';

@Entity({ name: 'permissions' })
export class PermissionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    enum: Action,
    type: 'enum',
  })
  action: Action;

  @Column({
    enum: Resource,
    type: 'enum',
  })
  resource: Resource;

  @ManyToMany(() => RoleEntity, (role) => role.permissions)
  roles: RoleEntity[];
}
