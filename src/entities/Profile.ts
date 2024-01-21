import { ContactType } from 'src/types/enums';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './User';

@Entity({ name: 'profiles' })
export class ProfileEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  sex: string;

  @Column()
  birthday: Date;

  @Column()
  source: string;

  @Column()
  image: string;

  @Column({ default: () => 'NOW()' })
  createdAt: Date;

  @Column({ default: () => 'NOW()', onUpdate: 'NOW()' })
  updatedAt: Date;

  @ManyToOne(() => UserEntity, (user) => user.id)
  @JoinColumn()
  user: UserEntity;

  @OneToMany(() => ContactEntity, (contact) => contact.profile)
  contacts: ContactEntity[];
}

@Entity({ name: 'contacts' })
export class ContactEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: ContactType,
    default: ContactType.Phone,
  })
  type: ContactType;

  @Column()
  value: string;

  @ManyToOne(() => ProfileEntity, (profile) => profile.id)
  @JoinColumn()
  profile: ProfileEntity;
}
