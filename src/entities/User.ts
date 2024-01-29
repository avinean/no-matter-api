import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role, Sex } from 'src/types/enums';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: () => 'NOW()' })
  createdAt: Date;

  @Column({ default: () => 'NOW()', onUpdate: 'NOW()' })
  updatedAt: Date;

  @OneToMany(() => UserProfileEntity, (profile) => profile.userId)
  profiles: UserProfileEntity[];
}

@Entity({ name: 'user_profiles' })
export class UserProfileEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({
    type: 'enum',
    enum: Sex,
  })
  sex: Sex;

  @Column()
  birthday: Date;

  @Column({ nullable: true })
  image: string;

  @Column({ unique: true, nullable: true })
  email: string;

  @Column({ unique: true })
  phone: string;

  @Column({ default: false })
  status: boolean;

  @Column({ default: () => 'NOW()' })
  createdAt: Date;

  @Column({ default: () => 'NOW()', onUpdate: 'NOW()' })
  updatedAt: Date;

  @Column({ nullable: true })
  userId: number;

  @ManyToOne(() => UserEntity, (user) => user.id)
  @JoinColumn()
  user: UserEntity;

  // @ManyToMany(() => RoleEntity, (role) => role.id)
  // roles: RoleEntity[];
}

@Entity({ name: 'roles' })
// @Index(['role', 'profileId'], { unique: true })
export class RoleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    default: Role.guest,
    enum: Role,
  })
  role: Role;

  @Column()
  profileId: number;

  // @ManyToMany(() => UserProfileEntity, (profile) => profile.id)
  // @JoinColumn()
  // profiles: UserProfileEntity;
}
