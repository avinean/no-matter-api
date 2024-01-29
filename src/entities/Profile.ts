import { ContactType, Sex } from 'src/types/enums';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'profiles' })
export class ProfileEntity {
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

  @Column()
  source: string;

  @Column({ nullable: true })
  image: string;

  @Column({ unique: true, nullable: true })
  email: string;

  @Column({ unique: true })
  phone: string;

  @Column({ default: false })
  status: boolean;

  @Column({ default: 0 })
  balance: number;

  @Column({ default: 0 })
  discount: number;

  @Column({ default: () => 'NOW()' })
  createdAt: Date;

  @Column({ default: () => 'NOW()', onUpdate: 'NOW()' })
  updatedAt: Date;

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
    default: ContactType.phone,
  })
  type: ContactType;

  @Column({ unique: true })
  value: string;

  @Column({ default: false })
  verified: boolean;

  @ManyToOne(() => ProfileEntity, (profile) => profile.id, { eager: true })
  @JoinColumn()
  profile: ProfileEntity;
}
