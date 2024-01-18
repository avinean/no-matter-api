import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from 'src/types/enums';

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
}

@Entity({ name: 'roles' })
@Index(['role', 'userId'], { unique: true })
export class RoleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    default: Role.Guest,
    enum: Role,
  })
  role: Role;

  @Column()
  userId: number;
}
