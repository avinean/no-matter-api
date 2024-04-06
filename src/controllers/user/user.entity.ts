import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import { ProfileEntity } from '../profile/profile.entity';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, default: null })
  phone: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  password: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToOne(() => ProfileEntity, (profile) => profile.primaryFor, {
    cascade: ['update'], // Add cascade option if you want changes to propagate
  })
  @JoinColumn()
  primaryProfile: ProfileEntity;

  @OneToMany(() => ProfileEntity, (profile) => profile.user)
  @JoinColumn()
  associatedProfiles: ProfileEntity[];

  @ManyToOne(() => ProfileEntity)
  createdBy: ProfileEntity;
}
