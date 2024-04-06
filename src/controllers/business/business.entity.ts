import {
  Column,
  Entity,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { BusinessObjectEntity } from '../business-object/business-object.entity';
import { RoleEntity } from '../role/role.entity';

@Entity({ name: 'businesses' })
export class BusinessEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  image: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(
    () => BusinessObjectEntity,
    (businessObject) => businessObject.business,
  )
  businessObjects: BusinessObjectEntity[];

  @OneToMany(() => RoleEntity, (role) => role.business)
  @JoinTable({ name: 'role_business' })
  roles: RoleEntity[];
}
